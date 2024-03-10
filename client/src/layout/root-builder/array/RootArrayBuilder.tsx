import { SchemaBuilder } from "@cms/schema";
import { ArrayValue, Property } from "@cms/types";
import { ReactElement } from "react";
import { RootBuilder } from "../RootBuilder";
import { RootBuilderItem } from "../types";
import { Delete } from "./Delete";
import css from "./array.module.css";

export class RootArrayBuilder extends RootBuilder<ArrayValue> {
  constructor(properties: Property[], data: ArrayValue, key?: string) {
    super(properties, data, false, key);
  }

  protected items() {
    const schemaBuilder = SchemaBuilder.instance;

    const items: RootBuilderItem[] = this.data.map((value, index) => {
      const parentSchemaType = schemaBuilder.inferParentSchemaType(value);
      const schemaType = schemaBuilder.inferSchemaType(value);
      const schema = schemaBuilder.getSchema(schemaType);

      return {
        key: index.toString(),
        type: parentSchemaType,
        schema,
        value,
      };
    });

    return items;
  }

  protected buildItem(item: ReactElement | null, index: number) {
    if (item) {
      return (
        <div key={item.key} className={css.item}>
          {item}
          <Delete itemIndex={index} />
        </div>
      );
    }

    return null;
  }

  public value(): ArrayValue {
    return this.builders.map(({ builder }) => builder.value());
  }
}
