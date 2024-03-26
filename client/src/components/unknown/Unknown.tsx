import { Builder, BuilderConstructorProperties, TypedObject } from "@cms/types";
import css from "./unknown.module.css";

export class UnknownBuilder implements Builder<TypedObject> {
  public readonly key: string;
  private value: TypedObject;

  constructor({ key, value }: BuilderConstructorProperties<TypedObject, void>) {
    this.key = `${key}-${crypto.randomUUID()}`;
    this.value = value;
  }

  public build() {
    return (
      <div className={css.unknown}>
        Unknown type {`{{ ${this.value.type} }}`}
      </div>
    );
  }

  public getValue() {
    return this.value;
  }
}
