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
  private _value: ArrayValue;
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
    this._value = value;
    this.name = name;
    this.showName = showName;

    this.builder = new RootArrayBuilder(schema, this._value);
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

  public value() {
    return this._value;
  }

  public update() {
    this._value.values.length = 0;
    this._value.values.push(...this.builder.value().values);
  }
}
