import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { Document, ObjectValue, Response } from "../types";
import { Constant } from "../constants";
import { RootBuilder } from "../layout";
import { SchemaBuilder } from "../schema";
import { SearchStore } from "./search";

class DocumentStore {
  private static readonly _documentsEndPoint: string = `${
    import.meta.env.VITE_API_ENDPOINT
  }/document`;

  private builders: Map<string, RootBuilder> = new Map();

  private _documents: Document[] = [];

  private _currentDocument: Document | null = null;

  private searchStore: SearchStore;

  private searchQuery: string = "";

  private searchDebounceTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    makeObservable<
      DocumentStore,
      "_documents" | "_currentDocument" | "builders" | "searchQuery"
    >(this, {
      _documents: observable,
      _currentDocument: observable,
      builders: observable,
      searchQuery: observable,
      fetchDocument: action,
      fetchDocuments: action,
      registerBuilder: action,
      documents: computed,
      currentDocument: computed,
    });

    this.searchStore = new SearchStore();
  }

  public registerBuilder = (id: string, builder: RootBuilder) => {
    this.builders.set(id, builder);
  };

  public getBuilder = (id: string, type: string) => {
    if (id === Constant.DRAFT) {
      return this.builders.get(type);
    }

    return this.builders.get(id);
  };

  public get documents() {
    if (this.searchQuery.length === 0) {
      return this._documents;
    }

    return this.searchStore.getDocuments(this.searchQuery);
  }

  public get currentDocument(): Document | null {
    return this._currentDocument;
  }

  public fetchDocuments = async () => {
    if (this._documents.length > 0) {
      return;
    }

    try {
      const response: Response<Document[]> = await (
        await fetch(DocumentStore._documentsEndPoint)
      ).json();

      if (!response.success) {
        return;
      }

      runInAction(() => {
        this._documents = response.data.sort((a, b) =>
          a.identifier.localeCompare(b.identifier)
        );
        this.searchStore.init(response.data);
      });
    } catch (ex: unknown) {
      // pass
    }
  };

  public fetchDocument = async (id: string) => {
    try {
      if (!id) {
        return;
      }

      const response: Response<Document> = await (
        await fetch(`${DocumentStore._documentsEndPoint}/${id}`)
      ).json();

      if (!response.success) {
        return;
      }

      runInAction(() => {
        this._currentDocument = response.data;
      });
    } catch (ex: unknown) {
      // pass
    }
  };

  public updateDocument = async () => {
    const builder = this.builders.get(
      this._currentDocument?.id.toString() ?? ""
    );

    if (!(this._currentDocument && builder)) {
      return;
    }

    try {
      await fetch(
        `${DocumentStore._documentsEndPoint}/${this._currentDocument.id}`,
        {
          method: "PUT",
          headers: Constant.httpHeaders,
          body: JSON.stringify({
            data: builder.value(),
            identifier: this._currentDocument.identifier,
          }),
        }
      );
    } catch (ex: unknown) {
      // pass
    }
  };

  public createDocument = async () => {
    const builder = this.builders.get(this._currentDocument?.type ?? "");

    if (!(this._currentDocument && builder)) {
      return;
    }

    try {
      const type = this._currentDocument.type;
      const data = builder.value() as ObjectValue;
      const identifierName =
        SchemaBuilder.instance.getSchema(type).identifier ?? "";
      const identifier = (data?.[identifierName] ?? "").toString();

      const { data: id }: Response<number> = await (
        await fetch(`${DocumentStore._documentsEndPoint}`, {
          method: "POST",
          headers: Constant.httpHeaders,
          body: JSON.stringify({
            type,
            identifier,
            data,
          }),
        })
      ).json();

      runInAction(() => {
        this.addDocument({
          id,
          type,
          identifier,
          data,
          createdAt: Constant.DUMMY_DATE,
        });
      });

      return { id, type };
    } catch (ex: unknown) {
      // pass
    }
  };

  public deleteDocument = async () => {
    if (!this._currentDocument) {
      return;
    }

    try {
      const id = this._currentDocument.id;

      await fetch(`${DocumentStore._documentsEndPoint}/${id}`, {
        method: "DELETE",
        headers: Constant.httpHeaders,
      });

      const index = this._documents.findIndex((document) => document.id === id);
      runInAction(() => {
        this._documents.splice(index, 1);
      });

      if (this.documents.length === 0) {
        return { id: -1, type: "" };
      }

      const currentDocument = this._documents[index % this._documents.length];

      return { id: currentDocument.id, type: currentDocument.type };
    } catch (ex: unknown) {
      // pass
    }
  };

  public createDraft = (type: string) => {
    const defaultDocument = SchemaBuilder.instance.getDefaultDocument(type);

    runInAction(() => {
      this._currentDocument = defaultDocument;
    });

    const schema = SchemaBuilder.instance.getSchema(type);
    const builder = new RootBuilder(
      schema.properties,
      defaultDocument.data as ObjectValue
    );

    this.builders.set(type, builder);
  };

  public set query(q: string) {
    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
    }

    this.searchDebounceTimer = setTimeout(() => {
      runInAction(() => {
        this.searchQuery = q;
      });
    }, 500);
  }

  private addDocument = (document: Document) => {
    let index = 0;

    for (const doc of this._documents) {
      if (doc.identifier.localeCompare(document.identifier) >= 0) {
        break;
      }

      index++;
    }

    runInAction(() => {
      this._documents.splice(index, 0, document);
      this.searchStore.addDocument(document);
    });
  };
}

export const documentStore = new DocumentStore();
