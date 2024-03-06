import { RootBuilder } from "../../layout";
import { objectStore } from "../../stores";
import {
  Builder,
  BuilderConstructorProperties,
  ObjectValue,
  Schema,
} from "../../types";
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
    objectStore.add(this.builder, this._value, this.value);
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
    return {
      type: this.schema.type,
      ...this.builder.value(),
    };
  };
}
