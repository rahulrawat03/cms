import { Schema, SchemaType } from "@cms/types";

export class Constant {
  public static readonly PRIMITIVE_SCHEMA_TYPES: Set<string> = new Set([
    SchemaType.NUMBER,
    SchemaType.STRING,
    SchemaType.BOOLEAN,
    SchemaType.IMAGE,
    SchemaType.FILE,
  ]);

  public static readonly httpHeaders = {
    "Content-Type": "application/json",
  };

  public static readonly DRAFT = "draft";

  public static readonly DUMMY_DATE = "2022-06-30";

  public static readonly UNKNOWN_DOCUMENT: Schema = {
    type: "unknown",
    as: "document",
    properties: [
      {
        name: "identifier",
        type: "string",
      },
    ],
    identifier: "identifier",
  };

  public static readonly UNKNOWN_OBJECT: Schema = {
    type: "unknown",
    as: "object",
    properties: [],
  };

  public static readonly INTERNAL_SERVER_ERROR =
    "Something went wrong! Please try again later.";
}
