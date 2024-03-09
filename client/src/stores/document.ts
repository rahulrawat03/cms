import { RootBuilder } from "@cms/layout";
import { SchemaBuilder } from "@cms/schema";
import { Document, DocumentPreview, ObjectValue, SchemaType } from "@cms/types";
import { api } from "@cms/utils";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

import { SearchStore } from "./search";

class DocumentStore {
  private endpoint: string = "/document";

  public _builder: RootBuilder | null = null;

  private _documents: DocumentPreview[] = [];

  private _currentDocument: Document | null = null;

  private searchStore: SearchStore;

  private searchQuery: string = "";

  private searchDebounceTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    makeObservable<
      DocumentStore,
      "_documents" | "_currentDocument" | "_builder" | "searchQuery"
    >(this, {
      _documents: observable,
      _currentDocument: observable,
      _builder: observable,
      searchQuery: observable,
      fetchDocument: action,
      fetchDocuments: action,
      documents: computed,
      currentDocument: computed,
      updateDocument: action,
    });

    this.searchStore = new SearchStore();
  }

  // Getters & Setters ==============================================

  public get documents() {
    if (this.searchQuery.length === 0) {
      return this._documents;
    }

    return this.searchStore.getDocuments(this.searchQuery);
  }

  public get currentDocument(): Document | null {
    return this._currentDocument;
  }

  public get builder(): RootBuilder | null {
    return this._builder;
  }

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

  // CRUD ===========================================================

  public fetchDocuments = async () => {
    if (this._documents.length > 0) {
      return;
    }

    try {
      const documents = await api<DocumentPreview[]>(this.endpoint);

      runInAction(() => {
        documents.sort((a, b) => a.identifier.localeCompare(b.identifier));
        this._documents = documents;
        this.searchStore.init(documents);
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

      runInAction(() => (this._builder = null));

      const document = await api<Document>(`${this.endpoint}/${id}`);

      this.populateEmptyProperties(document);

      runInAction(() => {
        this._currentDocument = document;
        this.updateBuilder(document);
      });
    } catch (ex: unknown) {
      // pass
    }
  };

  public updateDocument = async () => {
    if (!(this._currentDocument && this._builder)) {
      return;
    }

    try {
      const { id, type } = this._currentDocument;
      const data = this._builder.value() as ObjectValue;
      const identifierName =
        SchemaBuilder.instance.getSchema(type).identifier ?? "";

      await api<void>(`${this.endpoint}/${id}`, "PUT", {
        data,
        identifier: data[identifierName],
      });
    } catch (ex: unknown) {
      // pass
    }
  };

  public createDocument = async () => {
    if (!(this._currentDocument && this._builder)) {
      return;
    }

    try {
      const { type } = this._currentDocument;
      const data = this._builder.value() as ObjectValue;
      const identifierName =
        SchemaBuilder.instance.getSchema(type).identifier ?? "";
      const identifier = (data?.[identifierName] ?? "") as string;

      const { id } = await api<{ id: number }>(`${this.endpoint}`, "POST", {
        type,
        identifier,
        data,
      });

      runInAction(() => {
        this.addDocument({
          id,
          identifier,
          type,
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

      await api<void>(`${this.endpoint}/${id}`, "DELETE");

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

  // UTILITIES ======================================================

  public createDraft = (type: string) => {
    const defaultDocument = SchemaBuilder.instance.getDefaultValue(
      type as SchemaType
    ) as Document;

    runInAction(() => {
      this._currentDocument = defaultDocument;
      this.updateBuilder(defaultDocument);
    });
  };

  private updateBuilder = (document: Document) => {
    const schema = SchemaBuilder.instance.getSchema(document.type);
    runInAction(() => {
      this._builder = new RootBuilder(schema.properties, document.data);
    });
  };

  private populateEmptyProperties = (document: Document) => {
    const schemaBuilder = SchemaBuilder.instance;
    const schema = schemaBuilder.getSchema(document.type);

    for (const property of schema.properties) {
      if (!document.data[property.name]) {
        document.data[property.name] = schemaBuilder.getDefaultValue(
          property.type as SchemaType
        ) as ObjectValue;
      }
    }
  };

  private addDocument = (document: DocumentPreview) => {
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
