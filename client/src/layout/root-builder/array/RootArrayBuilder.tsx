import { SchemaBuilder } from "@cms/schema";
import { ArrayValue, Schema } from "@cms/types";
import { ReactElement } from "react";
import { RootBuilder } from "../RootBuilder";
import { RootBuilderItem } from "../types";
import { Delete } from "./Delete";
import css from "./array.module.css";

export class RootArrayBuilder extends RootBuilder<ArrayValue> {
  constructor(schema: Schema, data: ArrayValue) {
    super(schema, data, false);
  }

  protected items() {
    const schemaBuilder = SchemaBuilder.instance;

    const items: RootBuilderItem[] = this.data.values.map((value, index) => {
      const parentSchemaType = schemaBuilder.inferWrapperSchemaType(value);
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

  public getValue(): ArrayValue {
    return {
      type: this.schema.type,
      values: this.builders.map(({ builder }) => builder.getValue()),
    };
  }
}
