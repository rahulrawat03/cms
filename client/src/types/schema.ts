export interface Property {
  type: string;
  name: string;
}

export interface Schema {
  type: string;
  as: "document" | "object" | "array";
  properties?: Property[];
  identifier?: string;
  allowedTypes?: string[];
}

export interface ArraySchema {
  type: string;
  as: "array";
  allowedTypes: string[];
}

export interface ObjectSchema {
  type: string;
  as: "object";
  properties: Property[];
}

export interface DocumentSchema {
  type: string;
  as: "document";
  properties: Property[];
  identifier: string;
}

export enum SchemaType {
  NUMBER = "number",
  STRING = "string",
  IMAGE = "image",
  FILE = "file",
  ARRAY = "array",
  OBJECT = "object",
  DOCUMENT = "document",
  PRIMITIVE = "primitive",
  UNKNOWN = "unknown",
}
