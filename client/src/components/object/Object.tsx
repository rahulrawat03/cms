import { RootBuilder } from "@cms/layout";
import { objectStore } from "@cms/stores";
import {
  Builder,
  BuilderConstructorProperties,
  ObjectValue,
  Schema,
} from "@cms/types";
import { Button } from "../common";

export class ObjectBuilder implements Builder<ObjectValue> {
  public readonly key: string;
  private _value: ObjectValue;
  private name: string;
  private showName: boolean;
  private schema: Schema;

  private builder: RootBuilder;

  constructor({
    key,
    value,
    name,
    schema,
    showName,
  }: BuilderConstructorProperties<ObjectValue>) {
    this.key = key;
    this._value = value;
    this.name = name;
    this.schema = schema;
    this.showName = showName;

    this.builder = new RootBuilder(schema.properties, this._value);
  }

  private handleClick = () => {
    objectStore.add(this.builder, this.update);
  };

  public build = () => {
    return (
      <Button
        key={this.key}
        name={
          this.showName ? this.name : `{{ ${this.schema.type.toUpperCase()} }}`
        }
        onClick={this.handleClick}
      />
    );
  };

  public value = () => {
    return this._value;
  };

  public update = () => {
    const updatedValue = this.builder.value() as ObjectValue;

    for (const property in updatedValue) {
      this._value[property] = updatedValue[property];
    }
  };
}
