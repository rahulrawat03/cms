import { ArrayValue, Callback, ObjectValue } from "../../types";
import { RootBuilder } from "../../layout";

export enum LayerType {
  ARRAY,
  OBJECT,
}

export interface Layer {
  builder: RootBuilder;
  value: ArrayValue | ObjectValue;
  getValue: Callback<ArrayValue | ObjectValue>;
  type: LayerType;
}
