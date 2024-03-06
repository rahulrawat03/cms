import { runInAction } from "mobx";
import { RootBuilder } from "../../layout";
import { Builder, Callback, Value } from "../../types";
import { dialogStore } from "./base";
import { LayerType } from "./types";

class ArrayStore {
  public add = (builder: RootBuilder, update: Callback<void>) => {
    dialogStore.add({
      builder,
      update,
      type: LayerType.ARRAY,
    });
  };

  public addBuilder = (key: string, builder: Builder<Value>) => {
    runInAction(() => {
      dialogStore.current?.builder.addBuilder(key, builder);
      dialogStore.trigger = !dialogStore.trigger;
    });
  };
}

export const arrayStore = new ArrayStore();
