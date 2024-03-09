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

export interface File {
  type: "file" | "image";
  name: string;
  value: string;
}

export type Value = number | string | File | ArrayValue | ObjectValue;

export type ArrayValue = Value[];

export type ObjectValue = {
  [key: string]: Value;
};

export type TypedObject = ObjectValue & {
  type: string;
};
