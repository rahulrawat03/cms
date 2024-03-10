import { Builder, BuilderConstructorProperties } from "@cms/types";
import { Input } from "../common";

export class StringBuilder implements Builder<string> {
  public readonly key: string;
  private _value: string;
  private name: string;
  private showName: boolean;

  constructor({
    key,
    value,
    name,
    showName,
  }: BuilderConstructorProperties<string, void>) {
    this.key = `${key}-${crypto.randomUUID()}`;
    this._value = value;
    this.name = name;
    this.showName = showName;
  }

  public build() {
    return (
      <Input
        key={this.key}
        id={this.key}
        name={this.name}
        showName={this.showName}
        type={"string"}
        initialValue={this._value}
        setValue={(value) => (this._value = value as string)}
      />
    );
  }

  public value() {
    return this._value;
  }
}
