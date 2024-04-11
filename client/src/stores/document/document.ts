import { RootBuilder, RootObjectBuilder } from "@cms/layout";
import { SchemaBuilder } from "@cms/schema";
import {
  Document,
  DocumentPreview,
  ObjectValue,
  SchemaType,
  Value,
} from "@cms/types";
import { api } from "@cms/utils";
import { searchStore } from "./search";
import { createStore } from "@rahulrawat03/mustate";

class DocumentStore {
  public static readonly instance = createStore(new DocumentStore());

  private endpoint: string = "/document";

  private _builder: RootBuilder<ObjectValue> | null = null;

  private _documents: DocumentPreview[] = [];

  private _currentDocument: Document | null = null;

  private searchQuery: string = "";

  private searchDebounceTimer: ReturnType<typeof setTimeout> | null = null;

  private constructor() {}

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

  public setQuery(q: string) {
    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
    }
    this.searchDebounceTimer = setTimeout(() => (this.searchQuery = q), 500);
  }

  // CRUD ===========================================================

  public async fetchDocuments() {
    if (this._documents.length > 0) {
      return;
    }

    try {
      const documents = await api<DocumentPreview[]>(this.endpoint);

      documents.sort((a, b) => a.identifier.localeCompare(b.identifier));
      this._documents = documents;
      searchStore.init(documents);
    } catch (ex: unknown) {
      // pass
    }
  }

  public async fetchDocument(id: string) {
    try {
      if (!id) {
        return;
      }

      this._builder = null;

      const document = await api<Document>(`${this.endpoint}/${id}`);

      this.populateEmptyProperties(document.type, document.data);

      this._currentDocument = document;
      this.updateBuilder(document);
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
      const data = this._builder.getValue();
      const identifierName =
        SchemaBuilder.instance.getSchema(type).identifier ?? "";
      const identifier = data[identifierName] as string;

      await api<void>(`${this.endpoint}/${id}`, "PUT", {
        data,
        identifier,
      });

      const documentIndex = this._documents.findIndex(
        (document) => document.id === id
      );
      this._documents = [
        ...this._documents.slice(0, documentIndex),
        {
          id,
          identifier,
          type,
        },
        ...this._documents.slice(documentIndex + 1),
      ];
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
      const data = this._builder.getValue();
      const identifierName =
        SchemaBuilder.instance.getSchema(type).identifier ?? "";
      const identifier = (data?.[identifierName] ?? "") as string;

      const { id } = await api<{ id: number }>(`${this.endpoint}`, "POST", {
        type,
        identifier,
        data,
      });

      this.addDocument({
        id,
        identifier,
        type,
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
      const { id, identifier } = this._currentDocument;

      await api<void>(`${this.endpoint}/${id}`, "DELETE");

      const index = this._documents.findIndex((document) => document.id === id);

      this._documents = [
        ...this._documents.slice(0, index),
        ...this._documents.slice(index + 1),
      ];
      searchStore.removeDocument(identifier);

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

  public createDraft(type: string) {
    const defaultDocument = SchemaBuilder.instance.getDefaultValue(
      type as SchemaType
    ) as Document;

    this._currentDocument = defaultDocument;
    this.updateBuilder(defaultDocument);
  }

  private updateBuilder(document: Document) {
    const schema = SchemaBuilder.instance.getSchema(document.type);
    this._builder = new RootObjectBuilder(schema, document.data);
  }

  private populateEmptyProperties(type: string, data: ObjectValue) {
    const schemaBuilder = SchemaBuilder.instance;
    const properties = schemaBuilder.getSchema(type).properties ?? [];

    for (const property of properties) {
      const schemaType = schemaBuilder.getWrapperSchemaType(property.type);

      if (!data[property.name]) {
        data[property.name] = schemaBuilder.getDefaultValue(
          property.type as SchemaType
        ) as Value;
      } else if (schemaBuilder.isObjectType(schemaType)) {
        this.populateEmptyProperties(
          property.type,
          data[property.name]! as ObjectValue
        );
      }
    }
  }

  private addDocument(document: DocumentPreview) {
    let index = 0;

    for (const doc of this._documents) {
      if (doc.identifier.localeCompare(document.identifier) >= 0) {
        break;
      }

      index++;
    }

    this._documents = [
      ...this._documents.slice(0, index),
      document,
      ...this._documents.slice(index),
    ];
    searchStore.addDocument(document);
  }
}

export const documentStore = DocumentStore.instance;
