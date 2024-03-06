import { ArrayValue, Builder, BuilderConstructorProperties } from "../../types";
import { Button } from "../common";
import { RootBuilder } from "../../layout";
import { arrayStore } from "../../stores/dialog/array";

export class ArrayBuilder implements Builder<ArrayValue> {
  public readonly key: string;
  private _value: ArrayValue;
  private name: string;
  private showName: boolean;

  private builder: RootBuilder;

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

    this.builder = new RootBuilder([], this._value);
  }

  private handleClick = () => {
    arrayStore.add(this.builder, this._value, this.value);
  };

  public build = () => {
    return (
      <Button
        key={this.key}
        name={this.showName ? this.name : "{{ ARRAY }}"}
        onClick={this.handleClick}
      />
    );
  };

  public value = () => {
    return this.builder.value() as ArrayValue;
  };
}