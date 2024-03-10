import { ReactElement } from "react";

export interface Builder<T> {
  key: string;

  build(): ReactElement | null;

  value(): T;
}

export interface BuilderConstructorProperties<U, V> {
  key: string;
  value: U;
  name: string;
  schema: V;
  showName: boolean;
}
