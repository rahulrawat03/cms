import { Builder, BuilderConstructorProperties } from "@cms/types";
import { ArrayBuilder } from "../array";
import { DocumentBuilder } from "../document";
import { NumberBuilder } from "../number";
import { ObjectBuilder } from "../object";
import { StringBuilder } from "../string";
import { ImageBuilder } from "../image";
import { FileBuilder } from "../file";
import { UnknownBuilder } from "../unknown";

type BuilderClass<T> = new (
  properties: BuilderConstructorProperties<T>
) => Builder<T>;

export const ComponentMap: {
  [key: string]: BuilderClass<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
} = {
  number: NumberBuilder,
  string: StringBuilder,
  image: ImageBuilder,
  file: FileBuilder,
  array: ArrayBuilder,
  object: ObjectBuilder,
  document: DocumentBuilder,
  unknown: UnknownBuilder,
};
