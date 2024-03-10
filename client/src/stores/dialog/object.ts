import { Callback, ObjectValue } from "../../types";
import { RootBuilder } from "../../layout";
import { dialogStore } from "./base";
import { LayerType } from "./types";

class ObjectStore {
  public add(builder: RootBuilder<ObjectValue>, update: Callback<void>) {
    dialogStore.add({
      builder,
      update,
      type: LayerType.OBJECT,
    });
  }
}

export const objectStore = new ObjectStore();
