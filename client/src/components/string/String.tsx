import { Builder, BuilderConstructorProperties } from "@cms/types";
import { Input } from "../common";

export class StringBuilder implements Builder<string> {
  public readonly key: string;
  private value: string;
  private name: string;
  private showName: boolean;

  constructor({
    key,
    value,
    name,
    showName,
  }: BuilderConstructorProperties<string, void>) {
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
        type={"string"}
        initialValue={this.value}
        setValue={(value) => (this.value = value as string)}
      />
    );
  }

  public getValue() {
    return this.value;
  }
}
