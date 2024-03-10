import { RootBuilder, RootObjectBuilder } from "@cms/layout";
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
import { searchStore } from "./search";

class DocumentStore {
  public static readonly instance = new DocumentStore();

  private endpoint: string = "/document";

  private _builder: RootBuilder<ObjectValue> | null = null;

  private _documents: DocumentPreview[] = [];

  private _currentDocument: Document | null = null;

  private searchQuery: string = "";

  private searchDebounceTimer: ReturnType<typeof setTimeout> | null = null;

  private constructor() {
    makeObservable<
      DocumentStore,
      | "_documents"
      | "_currentDocument"
      | "_builder"
      | "searchQuery"
      | "updateBuilder"
    >(this, {
      _documents: observable,
      _currentDocument: observable,
      _builder: observable,
      searchQuery: observable,
      fetchDocument: action,
      fetchDocuments: action,
      updateDocument: action,
      updateBuilder: action,
      documents: computed,
      currentDocument: computed,
    });
  }

  // Getters & Setters ==============================================

  public get documents() {
    if (this.searchQuery.length === 0) {
      return this._documents;
    }

    return searchStore.getDocuments(this.searchQuery);
  }

  public get currentDocument(): Document | null {
    return this._currentDocument;
  }

  public get builder(): RootBuilder<ObjectValue> | null {
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

  public async fetchDocuments() {
    if (this._documents.length > 0) {
      return;
    }

    try {
      const documents = await api<DocumentPreview[]>(this.endpoint);

      runInAction(() => {
        documents.sort((a, b) => a.identifier.localeCompare(b.identifier));
        this._documents = documents;
        searchStore.init(documents);
      });
    } catch (ex: unknown) {
      // pass
    }
  }

  public async fetchDocument(id: string) {
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
  }

  public async updateDocument() {
    if (!(this._currentDocument && this._builder)) {
      return;
    }

    try {
      const { id, type } = this._currentDocument;
      const data = this._builder.value();
      const identifierName =
        SchemaBuilder.instance.getSchema(type).identifier ?? "";
      const identifier = data[identifierName] as string;

      await api<void>(`${this.endpoint}/${id}`, "PUT", {
        data,
        identifier,
      });

      runInAction(() => {
        const document = this._documents.find((document) => document.id === id);
        if (document) {
          document.identifier = identifier;
        }
      });
    } catch (ex: unknown) {
      // pass
    }
  }

  public async createDocument() {
    if (!(this._currentDocument && this._builder)) {
      return;
    }

    try {
      const { type } = this._currentDocument;
      const data = this._builder.value();
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
  }

  public async deleteDocument() {
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
  }

  // UTILITIES ======================================================

  public async createDraft(type: string) {
    const defaultDocument = SchemaBuilder.instance.getDefaultValue(
      type as SchemaType
    ) as Document;

    runInAction(() => {
      this._currentDocument = defaultDocument;
      this.updateBuilder(defaultDocument);
    });
  }

  private async updateBuilder(document: Document) {
    const schema = SchemaBuilder.instance.getSchema(document.type);

    runInAction(() => {
      this._builder = new RootObjectBuilder(schema.properties, document.data);
    });
  }

  private async populateEmptyProperties(document: Document) {
    const schemaBuilder = SchemaBuilder.instance;
    const schema = schemaBuilder.getSchema(document.type);

    for (const property of schema.properties) {
      if (!document.data[property.name]) {
        document.data[property.name] = schemaBuilder.getDefaultValue(
          property.type as SchemaType
        ) as ObjectValue;
      }
    }
  }

  private async addDocument(document: DocumentPreview) {
    let index = 0;

    for (const doc of this._documents) {
      if (doc.identifier.localeCompare(document.identifier) >= 0) {
        break;
      }

      index++;
    }

    runInAction(() => {
      this._documents.splice(index, 0, document);
      searchStore.addDocument(document);
    });
  }
}

export const documentStore = DocumentStore.instance;
