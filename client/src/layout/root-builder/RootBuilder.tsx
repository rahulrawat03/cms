import { ReactElement } from "react";
import { ComponentMap, Spacer } from "../../components";
import { SchemaBuilder } from "../../schema";
import {
  ArrayValue,
  Builder,
  ObjectValue,
  Property,
  Schema,
  Value,
} from "../../types";

interface RootBuilderItem {
  key: string;
  type: string;
  schema: Schema;
  value: Value;
}

export class RootBuilder implements Builder<ArrayValue | ObjectValue> {
  public readonly key: string;
  private builders: { key: string; builder: Builder<Value> }[];
  private isArrayType: boolean;

  constructor(
    properties: Property[],
    data: ArrayValue | ObjectValue,
    key?: string,
    init?: (rootBuilder: RootBuilder) => void
  ) {
    this.key = key ?? crypto.randomUUID();

    this.isArrayType = Array.isArray(data);

    let items: RootBuilderItem[];
    if (Array.isArray(data)) {
      items = this.valueInferredItems(data);
    } else {
      items = this.schemaInferredItems(properties, data);
    }

    this.builders = items.map((item) => ({
      key: item.key,
      builder: new ComponentMap[item.type]({
        key: item.key,
        value: item.value,
        name: item.key,
        showName: !this.isArrayType,
        schema: item.schema,
      }),
    }));

    init?.(this);
  }

  // Generate inputs for object
  private schemaInferredItems = (properties: Property[], data: ObjectValue) => {
    const schemaBuilder = SchemaBuilder.instance;

    const items: RootBuilderItem[] = properties.map(({ name, type }) => {
      const parentSchemaType = schemaBuilder.getParentSchemaType(type);
      const schema = schemaBuilder.getSchema(type);

      return {
        key: name,
        type: parentSchemaType,
        schema,
        value: data?.[name],
      };
    });

    return items;
  };

  // Generate inputs for arrays
  private valueInferredItems = (data: ArrayValue) => {
    const schemaBuilder = SchemaBuilder.instance;

    const items: RootBuilderItem[] = data.map((value, index) => {
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
  };

  public addBuilder = (key: string, builder: Builder<Value>) => {
    this.builders.push({
      key,
      builder,
    });
  };

  public build = () => {
    if (this.builders.length === 0) {
      return null;
    }

    let spacerIdx = 0;
    const elements: (ReactElement | null)[] = [
      <Spacer key={`spacer-${spacerIdx++}`} />,
    ];
    for (const { builder } of this.builders) {
      elements.push(builder.build(), <Spacer key={`spacer-${spacerIdx++}`} />);
    }

    return <>{elements}</>;
  };

  public value = () => {
    return this.isArrayType ? this.arrayValue() : this.objectValue();
  };

  private objectValue = () => {
    const value: ObjectValue = {};
    this.builders.forEach(({ key, builder }) => {
      value[key] = builder.value();
    });

    return value;
  };

  private arrayValue = () => {
    const value: ArrayValue = this.builders.map(({ builder }) =>
      builder.value()
    );

    return value;
  };
}
