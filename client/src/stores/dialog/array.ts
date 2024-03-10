import { RootBuilder } from "@cms/layout";
import { ArrayValue, Builder, Callback } from "@cms/types";
import { runInAction } from "mobx";

import { dialogStore } from "./base";
import { LayerType } from "./types";

class ArrayStore {
  public add(builder: RootBuilder<ArrayValue>, update: Callback<void>) {
    dialogStore.add({
      builder,
      update,
      type: LayerType.ARRAY,
    });
  }

  public delete(index: number) {
    if (this.builders) {
      runInAction(() => {
        this.builders!.splice(index, 1);
        dialogStore.trigger = !dialogStore.trigger;
      });
    }
  }

  public addBuilder(key: string, builder: Builder<ArrayValue>) {
    if (this.builders) {
      runInAction(() => {
        this.builders!.push({ key, builder });
        dialogStore.trigger = !dialogStore.trigger;
      });
    }
  }

  private get builders() {
    const builders = dialogStore.current?.builder.builders;
    return builders ?? null;
  }
}

export const arrayStore = new ArrayStore();
