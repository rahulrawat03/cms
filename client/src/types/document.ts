export interface DocumentPreview {
  id: number;
  identifier: string;
  type: string;
}

export interface Document {
  id: number;
  type: string;
  identifier: string;
  data: ObjectValue;
  createdAt: string;
}

export interface Resource {
  type: "file" | "image";
  name: string;
  value: string;
}

export type ArrayValue = {
  type: string;
  values: Value[];
};

export type ObjectValue = {
  [key: string]: Value;
};

export type TypedObject = ObjectValue & {
  type: string;
};

export type Value =
  | number
  | string
  | boolean
  | Resource
  | ArrayValue
  | ObjectValue;
