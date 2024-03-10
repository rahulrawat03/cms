import { Builder, BuilderConstructorProperties } from "@cms/types";
import { ArrayBuilder } from "../array";
import { DocumentBuilder } from "../document";
import { NumberBuilder } from "../number";
import { ObjectBuilder } from "../object";
import { StringBuilder } from "../string";
import { ImageBuilder } from "../image";
import { FileBuilder } from "../file";
import { UnknownBuilder } from "../unknown";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BuilderClass<U = any, V = any> = new (
  properties: BuilderConstructorProperties<U, V>
) => Builder<U>;

export const ComponentMap: {
  [key: string]: BuilderClass;
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
