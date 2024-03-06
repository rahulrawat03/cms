import { Callback, ObjectValue } from "../../types";
import { RootBuilder } from "../../layout";
import { dialogStore } from "./base";
import { LayerType } from "./types";

class ObjectStore {
  public remove() {
    dialogStore.remove();
  }

  public add(
    builder: RootBuilder,
    value: ObjectValue,
    getValue: Callback<ObjectValue>
  ) {
    dialogStore.add({
      builder,
      value,
      getValue,
      type: LayerType.OBJECT,
    });
  }

  public clear() {
    dialogStore.clear();
  }
}

export const objectStore = new ObjectStore();
