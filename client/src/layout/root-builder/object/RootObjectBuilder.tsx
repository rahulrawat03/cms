import { SchemaBuilder } from "@cms/schema";
import { ObjectValue, Property } from "@cms/types";
import { ReactElement } from "react";
import { RootBuilder } from "../RootBuilder";
import { RootBuilderItem } from "../types";

export class RootObjectBuilder extends RootBuilder<ObjectValue> {
  constructor(properties: Property[], data: ObjectValue, key?: string) {
    super(properties, data, true, key);
  }

  protected items() {
    const schemaBuilder = SchemaBuilder.instance;

    const items: RootBuilderItem[] = this.properties.map(({ name, type }) => {
      const parentSchemaType = schemaBuilder.getParentSchemaType(type);
      const schema = schemaBuilder.getSchema(type);

      return {
        key: name,
        type: parentSchemaType,
        schema,
        value: this.data?.[name],
      };
    });

    return items;
  }

  protected buildItem(item: ReactElement | null) {
    return item;
  }

  public value(): ObjectValue {
    const value: ObjectValue = {};
    this.builders.forEach(({ key, builder }) => {
      value[key] = builder.value();
    });

    return value;
  }
}
