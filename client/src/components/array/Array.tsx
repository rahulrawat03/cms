import { RootArrayBuilder, RootBuilder } from "@cms/layout";
import { arrayStore } from "@cms/stores";
import { ArrayValue, Builder, BuilderConstructorProperties } from "@cms/types";
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
    showName,
  }: BuilderConstructorProperties<ArrayValue>) {
    this.key = key;
    this._value = value;
    this.name = name;
    this.showName = showName;

    this.builder = new RootArrayBuilder([], this._value);
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
    this._value.length = 0;
    this._value.push(...this.builder.value());
  }
}
