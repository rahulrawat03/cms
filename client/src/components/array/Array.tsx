import { RootArrayBuilder, RootBuilder } from "@cms/layout";
import { arrayStore } from "@cms/stores";
import {
  ArraySchema,
  ArrayValue,
  Builder,
  BuilderConstructorProperties,
} from "@cms/types";
import { Button } from "../common";

export class ArrayBuilder implements Builder<ArrayValue> {
  public readonly key: string;
  private value: ArrayValue;
  private name: string;
  private showName: boolean;

  private builder: RootBuilder<ArrayValue>;

  constructor({
    key,
    value,
    name,
    schema,
    showName,
  }: BuilderConstructorProperties<ArrayValue, ArraySchema>) {
    this.key = key;
    this.value = value;
    this.name = name;
    this.showName = showName;

    this.builder = new RootArrayBuilder(schema, this.value);
  }

  private handleClick() {
    arrayStore.add(this.builder, this.update.bind(this));
  }

  public build() {
    return (
      <Button
        key={this.key}
        name={this.showName ? this.name : "{{ ARRAY }}"}
        onClick={this.handleClick.bind(this)}
      />
    );
  }

  public getValue() {
    return this.value;
  }

  public update() {
    this.value.values.length = 0;
    this.value.values.push(...this.builder.getValue().values);
  }
}
