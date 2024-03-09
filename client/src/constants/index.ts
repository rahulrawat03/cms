import { SchemaType } from "@cms/types";

export class Constant {
  public static readonly primiteSchemaTypes: Set<string> = new Set([
    SchemaType.NUMBER,
    SchemaType.STRING,
    SchemaType.IMAGE,
    SchemaType.FILE,
    SchemaType.ARRAY,
  ]);

  public static readonly httpHeaders = {
    "Content-Type": "application/json",
  };

  public static readonly DRAFT = "draft";

  public static readonly DUMMY_DATE = "2022-06-30";
}
