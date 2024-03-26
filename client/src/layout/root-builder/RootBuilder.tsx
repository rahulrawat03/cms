import { ComponentMap, Spacer } from "@cms/components";
import { Builder, Schema, Value } from "@cms/types";
import { ReactElement } from "react";
import { RootBuilderItem } from "./types";

export abstract class RootBuilder<T> implements Builder<T> {
  public readonly key: string;
  public readonly type: string;

  public builders: { key: string; builder: Builder<Value> }[] = [];

  constructor(protected schema: Schema, protected data: T, showName: boolean) {
    this.key = crypto.randomUUID();
    this.type = schema.type;

    const items = this.items();
    this.builders = items.map((item) => ({
      key: item.key,
      builder: new ComponentMap[item.type]({
        key: item.key,
        value: item.value,
        name: item.key,
        schema: item.schema,
        showName,
      }),
    }));
  }

  public build() {
    if (this.builders.length === 0) {
      return null;
    }

    let spacerIdx = 0;
    const elements: (ReactElement | null)[] = [
      <Spacer key={`spacer-${spacerIdx++}`} />,
    ];

    this.builders.forEach(({ builder }, index) =>
      elements.push(
        this.buildItem(builder.build(), index),
        <Spacer key={`spacer-${spacerIdx++}`} />
      )
    );

    return <>{elements}</>;
  }

  protected abstract items(): RootBuilderItem[];

  protected abstract buildItem(
    item: ReactElement | null,
    index: number
  ): ReactElement | null;

  public abstract getValue(): T;
}
