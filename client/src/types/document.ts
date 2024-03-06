export interface Document {
  id: number;
  type: string;
  identifier: string;
  data: ObjectValue;
  createdAt: string;
}

export type Value = number | string | object | ArrayValue | ObjectValue;

export type ArrayValue = Value[];

export type ObjectValue = { [key: string]: Value };
