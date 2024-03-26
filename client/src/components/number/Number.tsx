import { Input } from "../common";
import { Builder, BuilderConstructorProperties } from "@cms/types";

export class NumberBuilder implements Builder<number> {
  public readonly key: string;
  private value: number;
  private name: string;
  private showName: boolean;

  constructor({
    key,
    value,
    name,
    showName,
  }: BuilderConstructorProperties<number, void>) {
    this.key = `${key}-${crypto.randomUUID()}`;
    this.value = value;
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
        type={"number"}
        initialValue={this.value}
        setValue={(value) => (this.value = value as number)}
      />
    );
  }

  public getValue() {
    return this.value;
  }
}
