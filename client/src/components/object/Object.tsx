import { RootBuilder, RootObjectBuilder } from "@cms/layout";
import { objectStore } from "@cms/stores";
import {
  Builder,
  BuilderConstructorProperties,
  ObjectSchema,
  ObjectValue,
  Schema,
} from "@cms/types";
import { Button } from "../common";

export class ObjectBuilder implements Builder<ObjectValue> {
  public readonly key: string;
  private value: ObjectValue;
  private name: string;
  private showName: boolean;
  private schema: Schema;

  private builder: RootBuilder<ObjectValue>;

  constructor({
    key,
    value,
    name,
    schema,
    showName,
  }: BuilderConstructorProperties<ObjectValue, ObjectSchema>) {
    this.key = key;
    this.value = value;
    this.name = name;
    this.schema = schema;
    this.showName = showName;

    this.builder = new RootObjectBuilder(schema, this.value);
  }

  private handleClick() {
    objectStore.add(this.builder, this.update.bind(this));
  }

  public build() {
    return (
      <Button
        key={this.key}
        name={
          this.showName ? this.name : `{{ ${this.schema.type.toUpperCase()} }}`
        }
        onClick={this.handleClick.bind(this)}
      />
    );
  }

  public getValue() {
    return this.value;
  }

  public update() {
    const updatedValue = this.builder.getValue();

    for (const property in updatedValue) {
      this.value[property] = updatedValue[property];
    }
  }
}
