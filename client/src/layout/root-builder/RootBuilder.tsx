import { Builder, Property, Value } from "@cms/types";
import { ReactElement } from "react";
import { RootBuilderItem } from "./types";
import { ComponentMap, Spacer } from "@cms/components";

export abstract class RootBuilder<T> implements Builder<T> {
  public readonly key: string;
  public builders: { key: string; builder: Builder<Value> }[] = [];

  constructor(
    protected properties: Property[],
    protected data: T,
    showName: boolean,
    key?: string
  ) {
    this.key = key ?? crypto.randomUUID();

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

  public abstract value(): T;
}
