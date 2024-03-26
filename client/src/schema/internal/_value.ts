import { Constant } from "@cms/constants";
import {
  ArrayValue,
  Document,
  ObjectSchema,
  ObjectValue,
  SchemaType,
  Value,
} from "@cms/types";
import { _Schema } from "./_schema";

export class _Value {
  constructor(private schema: _Schema) {}

  public getValue(type: string) {
    const schemaType = this.schema.getWrapperSchemaType(type);

    switch (schemaType) {
      case SchemaType.STRING:
      case SchemaType.NUMBER:
      case SchemaType.BOOLEAN:
      case SchemaType.IMAGE:
      case SchemaType.FILE:
        return this.getPrimitiveValue(type);

      case SchemaType.ARRAY:
        return this.getArrayValue(type);

      case SchemaType.OBJECT:
        return this.getObjectValue(type);

      case SchemaType.DOCUMENT:
        return this.getDocumentValue(type);

      default:
        throw new Error(`Invalid schema type "${type}" found.`);
    }
  }

  private getPrimitiveValue(type: string): Value {
    switch (type) {
      case SchemaType.NUMBER:
        return 0;
      case SchemaType.STRING:
        return "";
      case SchemaType.BOOLEAN:
        return false;
      default:
        return {
          type,
          name: "",
          value: "",
        };
    }
  }

  private getArrayValue(type: string): ArrayValue {
    return {
      type,
      values: [],
    };
  }

  private getObjectValue(type: string): ObjectValue {
    const schema = this.schema.getSchema(type) as ObjectSchema;

    const value: ObjectValue = { type };
    for (const property of schema.properties) {
      value[property.name] = this.getValue(property.type) as Value;
    }

    return value;
  }

  private getDocumentValue(type: string) {
    const documentData = this.getObjectValue(type);

    const document: Document = {
      id: NaN,
      identifier: "",
      type,
      data: documentData,
      createdAt: Constant.DUMMY_DATE,
    };

    return document;
  }
}
