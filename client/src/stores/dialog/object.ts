import { RootBuilder } from "@cms/layout";
import { Callback, ObjectValue } from "@cms/types";
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
