import { Builder, BuilderConstructorProperties } from "../../types";
import { ArrayBuilder } from "../array";
import { DocumentBuilder } from "../document";
import { NumberBuilder } from "../number";
import { ObjectBuilder } from "../object";
import { StringBuilder } from "../string";

type BuilderClass<T> = new (
  properties: BuilderConstructorProperties<T>
) => Builder<T>;

export const ComponentMap: {
  [key: string]: BuilderClass<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
} = {
  number: NumberBuilder,
  string: StringBuilder,
  document: DocumentBuilder,
  object: ObjectBuilder,
  array: ArrayBuilder,
};
