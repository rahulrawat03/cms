import { Input } from "../common";
import { Builder, BuilderConstructorProperties } from "../../types";

export class NumberBuilder implements Builder<number> {
  public readonly key: string;
  private _value: number;
  private name: string;
  private showName: boolean;

  constructor({
    key,
    value,
    name,
    showName,
  }: BuilderConstructorProperties<number>) {
    this.key = `${key}-${crypto.randomUUID()}`;
    this._value = value;
    this.name = name;
    this.showName = showName;
  }

  public build = () => {
    return (
      <Input
        key={this.key}
        id={this.key}
        name={this.name}
        showName={this.showName}
        type={"number"}
        initialValue={this._value}
        setValue={(value) => (this._value = value as number)}
      />
    );
  };

  public value = () => {
    return this._value;
  };
}
