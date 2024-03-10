import { Schema, Value } from "@cms/types";

export interface RootBuilderItem {
  key: string;
  type: string;
  schema: Schema;
  value: Value;
}
