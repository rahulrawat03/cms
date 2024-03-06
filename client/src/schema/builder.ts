import { Constant } from "../constants";
import { Document, ObjectValue, Schema, SchemaType, Value } from "../types";

export class SchemaBuilder {
  private static _instance: SchemaBuilder;

  public static get instance() {
    return this._instance;
  }

  public static init(schemas: Schema[]) {
    this._instance = new SchemaBuilder(schemas);
  }

  private documentTypes = new Map<string, Schema>();
  private objectTypes = new Map<string, Schema>();

  public get schemaTypes() {
    return <const>[...Constant.primiteSchemaTypes, ...this.objectTypes.keys()];
  }

  public get documentSchemaTypes() {
    return <const>[...this.documentTypes.keys()];
  }

  private constructor(public schemas: Schema[]) {
    for (const schema of schemas) {
      this.populateTypes(schema, schema.as);
    }

    this.validateUnregisteredTypes();
    this.validateDuplicateProperties();
  }

  private populateTypes = (schema: Schema, as: string) => {
    const type = schema.type;

    switch (as) {
      case "document": {
        if (this.documentTypes.has(type)) {
          throw new Error(
            `Document of type "${type}" is registered multiple times.`
          );
        }

        if (!schema.identifier) {
          throw new Error(
            `Document of type "${type}" has no identifier specified.`
          );
        }

        const identifierProperty = schema.properties.find(
          ({ name }) => name === schema.identifier
        );

        if (!identifierProperty) {
          throw new Error(
            `Document of type "${type}" has no property corresponding to the identifier "${schema.identifier}".`
          );
        }

        if (identifierProperty.type !== SchemaType.STRING) {
          throw new Error(
            `Identifier can only be of type "string". Document of type "${type}" specifies identifier of type "${identifierProperty.type}".`
          );
        }

        this.documentTypes.set(type, schema);
        break;
      }

      case "object":
        if (this.objectTypes.has(type)) {
          throw new Error(
            `Object of type "${type}" is registered multiple times.`
          );
        }

        this.objectTypes.set(type, schema);
        break;

      // Primitive Type
      default:
        throw new Error(`Invalid wrapper type "${type}" chosen.`);
    }
  };

  private validateDuplicateProperties = () => {
    for (const schema of this.schemas) {
      const registeredProperties = new Set<string>();

      for (const { name } of schema.properties) {
        if (registeredProperties.has(name)) {
          throw new Error(`
            Schema "${schema.type}" has duplicate properties by name "${name}"
          `);
        }
      }
    }
  };

  private validateUnregisteredTypes = () => {
    const unregisteredTypes = new Set<string>();

    for (const schema of this.schemas) {
      if (this.isPrimitiveType(schema.type)) {
        continue;
      }

      for (const property of schema.properties) {
        const propertyType = property.type;

        if (
          !this.documentTypes.has(propertyType) &&
          !this.objectTypes.has(propertyType) &&
          !this.isPrimitiveType(propertyType)
        ) {
          unregisteredTypes.add(propertyType);
        }
      }
    }

    if (unregisteredTypes.size > 0) {
      throw new Error(`Unregistered types found: ${[...unregisteredTypes]}`);
    }
  };

  public getSchema = (type: string) => {
    const schemaType = this.getParentSchemaType(type);

    switch (schemaType) {
      case SchemaType.STRING:
      case SchemaType.NUMBER:
      case SchemaType.IMAGE:
      case SchemaType.FILE:
      case SchemaType.ARRAY:
        return this.getPrimitiveSchema(type);

      case SchemaType.OBJECT:
        return this.getObjectSchema(type);

      case SchemaType.DOCUMENT:
        return this.getDocumentSchema(type);

      default:
        throw new Error(`Invalid schema type "${type}" found.`);
    }
  };

  private getDocumentSchema = (type: string) => {
    if (!this.documentTypes.has(type)) {
      throw new Error(`Document of type "${type}" is not registered`);
    }

    return this.documentTypes.get(type) as Schema;
  };

  private getObjectSchema = (type: string) => {
    if (!this.objectTypes.has(type)) {
      throw new Error(`Object of type "${type}" is not registered`);
    }

    return this.objectTypes.get(type) as Schema;
  };

  private getPrimitiveSchema = (type: string) => {
    return {
      as: SchemaType.PRIMITIVE as string,
      type,
      properties: [],
    } as Schema;
  };

  private isPrimitiveType = (type: string) => {
    return Constant.primiteSchemaTypes.has(type);
  };

  public getParentSchemaType = (type: string) => {
    if (this.isPrimitiveType(type)) {
      return type;
    }

    if (this.documentTypes.has(type)) {
      return SchemaType.DOCUMENT;
    }

    return SchemaType.OBJECT;
  };

  public inferParentSchemaType = (value: Value) => {
    if (
      typeof value === SchemaType.NUMBER ||
      typeof value === SchemaType.STRING
    ) {
      return typeof value;
    }

    if (Array.isArray(value)) {
      return SchemaType.ARRAY;
    }

    return SchemaType.OBJECT;
  };

  public inferSchemaType = (value: Value) => {
    const parentSchemaType = this.inferParentSchemaType(value);

    if (this.isPrimitiveType(parentSchemaType)) {
      return parentSchemaType;
    }

    return (value as ObjectValue)?.["type"] as string;
  };

  public getDefaultValue = (type: SchemaType): Value => {
    switch (type) {
      case SchemaType.NUMBER:
        return 0;
      case SchemaType.STRING:
        return "";
      case SchemaType.ARRAY:
        return [];
      case SchemaType.OBJECT:
      default:
        return {};
    }
  };

  public getDefaultDocument = (type: string): Document => {
    const documentData = this.getEmptyDocumentValue(type);

    const document: Document = {
      id: NaN,
      identifier: "",
      type,
      data: documentData,
      createdAt: Constant.DUMMY_DATE,
    };

    return document;
  };

  private getEmptyDocumentValue = (type: string): Value => {
    const parentSchemaType = this.getParentSchemaType(type);
    const schema = this.getSchema(type);

    if (this.isPrimitiveType(parentSchemaType)) {
      return this.getDefaultValue(parentSchemaType as SchemaType);
    }

    const value: ObjectValue = {};
    for (const property of schema.properties) {
      value[property.name] = this.getEmptyDocumentValue(property.type);
    }

    return value;
  };
}
