import { documentStore } from "@cms/stores";
import {
  Builder,
  BuilderConstructorProperties,
  ObjectValue,
  Schema,
} from "@cms/types";
import { ChevronRight } from "react-feather";
import { Link } from "react-router-dom";
import css from "./document.module.css";

export class DocumentBuilder implements Builder<ObjectValue> {
  public readonly key: string;
  private name: string;
  private _value: ObjectValue;
  private schema: Schema;

  constructor({
    key,
    name,
    value,
    schema,
  }: BuilderConstructorProperties<ObjectValue>) {
    this.key = key;
    this.name = name;
    this._value = value;
    this.schema = schema;
  }

  public build() {
    const { type, isUnknown } = this._value;
    const name = isUnknown ? `Unknown Document {{ ${type} }}` : this.name;

    return (
      <Link
        key={this.key}
        to={`/${this.schema.type}/${this.key}`}
        className={css.document}
      >
        <h3 className={css.documentTitle}>{name}</h3>
        <ChevronRight />
      </Link>
    );
  }

  public value() {
    return documentStore.builder?.value() ?? {};
  }
}
