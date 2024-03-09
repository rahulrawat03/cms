import { RootBuilder } from "@cms/layout";
import { Callback } from "@cms/types";

export enum LayerType {
  ARRAY,
  OBJECT,
}

export interface Layer {
  builder: RootBuilder;
  update: Callback<void>;
  type: LayerType;
}
