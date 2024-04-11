import { RootBuilder } from "@cms/layout";
import { SchemaBuilder } from "@cms/schema";
import { ArrayValue, Builder, Callback } from "@cms/types";
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
      this.builders.splice(index, 1);
      dialogStore.trigger = !dialogStore.trigger;
    }
  }

  public get options() {
    const type = dialogStore.current?.builder.type;
    if (type) {
      const schema = SchemaBuilder.instance.getSchema(type);
      return schema.allowedTypes ?? [];
    }

    return [];
  }

  public addBuilder(key: string, builder: Builder<ArrayValue>) {
    if (this.builders) {
      this.builders.push({ key, builder });
      dialogStore.trigger = !dialogStore.trigger;
    }
  }

  private get builders() {
    const builders = dialogStore.current?.builder.builders;
    return builders ?? null;
  }
}

export const arrayStore = new ArrayStore();
