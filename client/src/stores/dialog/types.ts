import { Callback } from "../../types";
import { RootBuilder } from "../../layout";

export enum LayerType {
  ARRAY,
  OBJECT,
}

export interface Layer {
  builder: RootBuilder;
  update: Callback<void>;
  type: LayerType;
}
