import { RootBuilder } from "@cms/layout";
import { ArrayValue, Callback, ObjectValue } from "@cms/types";

export enum LayerType {
  ARRAY,
  OBJECT,
}

export interface Layer {
  builder: RootBuilder<ArrayValue | ObjectValue>;
  update: Callback<void>;
  type: LayerType;
}
