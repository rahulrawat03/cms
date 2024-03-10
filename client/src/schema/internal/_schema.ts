import { Constant } from "@cms/constants";
import { Schema, SchemaType, TypedObject, Value } from "@cms/types";
import { _Helper } from "./_helper";
import { _Registry } from "./_types";

export class _Schema {
  private arrayTypes = new Map<string, Schema>();
  private objectTypes = new Map<string, Schema>();
  private documentTypes = new Map<string, Schema>();

  private helper: _Helper;

  constructor({ arrayTypes, objectTypes, documentTypes, helper }: _Registry) {
    this.arrayTypes = arrayTypes;
    this.objectTypes = objectTypes;
    this.documentTypes = documentTypes;

    this.helper = helper;
  }

  public getSchema(type: string, document: boolean = false) {
    const schemaType = this.getWrapperSchemaType(type);

    switch (schemaType) {
      case SchemaType.STRING:
      case SchemaType.NUMBER:
      case SchemaType.IMAGE:
      case SchemaType.FILE:
        return this.getPrimitiveSchema(type);

      case SchemaType.ARRAY:
        return this.getArraySchema(type);

      case SchemaType.OBJECT:
        return this.getObjectSchema(type);

      case SchemaType.DOCUMENT:
        return this.getDocumentSchema(type);

      default:
        return document ? Constant.UNKNOWN_DOCUMENT : Constant.UNKNOWN_OBJECT;
    }
  }

  private getPrimitiveSchema(type: string) {
    return {
      as: SchemaType.PRIMITIVE as string,
      type,
      properties: [],
    } as Schema;
  }

  private getArraySchema(type: string) {
    if (!this.arrayTypes.has(type)) {
      throw new Error(`Object of type "${type}" is not registered`);
    }

    return this.arrayTypes.get(type) as Schema;
  }

  private getObjectSchema(type: string) {
    if (!this.objectTypes.has(type)) {
      throw new Error(`Object of type "${type}" is not registered`);
    }

    return this.objectTypes.get(type) as Schema;
  }

  private getDocumentSchema(type: string) {
    if (!this.documentTypes.has(type)) {
      throw new Error(`Document of type "${type}" is not registered`);
    }

    return this.documentTypes.get(type) as Schema;
  }

  public getWrapperSchemaType(type: string) {
    if (this.helper.isPrimitiveType(type)) {
      return type;
    }

    if (this.arrayTypes.has(type)) {
      return SchemaType.ARRAY;
    }

    if (this.objectTypes.has(type)) {
      return SchemaType.OBJECT;
    }

    if (this.documentTypes.has(type)) {
      return SchemaType.DOCUMENT;
    }

    return SchemaType.UNKNOWN;
  }

  public inferWrapperSchemaType(value: Value) {
    if (
      typeof value === SchemaType.NUMBER ||
      typeof value === SchemaType.STRING
    ) {
      return typeof value;
    }

    const { type } = value as TypedObject;
    return this.getWrapperSchemaType(type);
  }

  public inferSchemaType(value: Value) {
    const parentSchemaType = this.inferWrapperSchemaType(value);

    if (this.helper.isPrimitiveType(parentSchemaType)) {
      return parentSchemaType;
    }

    if (parentSchemaType === SchemaType.UNKNOWN) {
      return parentSchemaType;
    }

    return (value as TypedObject).type;
  }
}
