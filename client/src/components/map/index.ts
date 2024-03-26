import { Builder, BuilderConstructorProperties } from "@cms/types";
import { ArrayBuilder } from "../array";
import { DocumentBuilder } from "../document";
import { FileBuilder } from "../file";
import { ImageBuilder } from "../image";
import { NumberBuilder } from "../number";
import { ObjectBuilder } from "../object";
import { StringBuilder } from "../string";
import { BooleanBuilder } from "../switch";
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
  boolean: BooleanBuilder,
  image: ImageBuilder,
  file: FileBuilder,
  array: ArrayBuilder,
  object: ObjectBuilder,
  document: DocumentBuilder,
  unknown: UnknownBuilder,
};
