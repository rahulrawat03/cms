import { Callback, ArrayValue } from "../../types";
import { RootBuilder } from "../../layout";
import { dialogStore } from "./base";
import { LayerType } from "./types";

class ArrayStore {
  public remove() {
    dialogStore.remove();
  }

  public add(
    builder: RootBuilder,
    value: ArrayValue,
    getValue: Callback<ArrayValue>
  ) {
    dialogStore.add({
      builder,
      value,
      getValue,
      type: LayerType.ARRAY,
    });
  }

  public clear() {
    dialogStore.clear();
  }
}

export const arrayStore = new ArrayStore();
