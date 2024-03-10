import { Builder, BuilderConstructorProperties, TypedObject } from "@cms/types";
import css from "./unknown.module.css";

export class UnknownBuilder implements Builder<TypedObject> {
  public readonly key: string;
  private _value: TypedObject;

  constructor({ key, value }: BuilderConstructorProperties<TypedObject>) {
    this.key = `${key}-${crypto.randomUUID()}`;
    this._value = value;
  }

  public build() {
    return (
      <div className={css.unknown}>
        Unknown type {`{{ ${this._value.type} }}`}
      </div>
    );
  }

  public value() {
    return this._value;
  }
}
