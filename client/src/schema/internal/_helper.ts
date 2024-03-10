import { Constant } from "@cms/constants";
import { SchemaType } from "@cms/types";

export class _Helper {
  public isPrimitiveType(type: string) {
    return Constant.PRIMITIVE_SCHEMA_TYPES.has(type);
  }

  public isArrayType(type: string) {
    return type === SchemaType.ARRAY;
  }

  public isObjectType(type: string) {
    return type === SchemaType.OBJECT;
  }
}
