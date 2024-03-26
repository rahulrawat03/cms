import { Switch } from "../common";
import { Builder, BuilderConstructorProperties } from "@cms/types";

export class BooleanBuilder implements Builder<boolean> {
  public readonly key: string;
  private value: boolean;
  private name: string;
  private showName: boolean;

  constructor({
    key,
    value,
    name,
    showName,
  }: BuilderConstructorProperties<boolean, void>) {
    this.key = `${key}-${crypto.randomUUID()}`;
    this.value = value;
    this.name = name;
    this.showName = showName;
  }

  private handleClick(value: boolean) {
    this.value = value;
  }

  public build() {
    return (
      <Switch
        key={this.key}
        name={this.name}
        showName={this.showName}
        initialValue={this.value}
        onClick={this.handleClick.bind(this)}
      />
    );
  }

  public getValue() {
    return this.value;
  }
}
