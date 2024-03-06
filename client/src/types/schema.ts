export interface Property {
  type: string;
  name: string;
}

export interface Schema {
  type: string;
  as: "document" | "object";
  properties: Property[];
  identifier?: string;
}

export enum SchemaType {
  NUMBER = "number",
  STRING = "string",
  IMAGE = "image",
  FILE = "file",
  OBJECT = "object",
  ARRAY = "array",
  DOCUMENT = "document",
  PRIMITIVE = "primitive",
}
