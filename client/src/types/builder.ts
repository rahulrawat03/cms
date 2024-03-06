import { ReactElement } from "react";
import { Schema } from "./schema";
import { Value } from "./document";

export interface Builder<T> {
  key: string;

  build(): ReactElement | null;

  value(): T;
}

export interface BuilderConstructorProperties<T> {
  key: string;
  value: T;
  name: string;
  schema: Schema;
  showName: boolean;
  parent?: Value;
}
