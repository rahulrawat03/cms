import { RootBuilder } from "@cms/layout";
import { Builder, Callback, Value } from "@cms/types";
import { runInAction } from "mobx";

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
