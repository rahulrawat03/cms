import { documentStore } from "@cms/stores";
import {
  Builder,
  BuilderConstructorProperties,
  ObjectValue,
  DocumentSchema,
} from "@cms/types";
import { ChevronRight } from "react-feather";
import { Link } from "react-router-dom";
import css from "./document.module.css";

export class DocumentBuilder implements Builder<ObjectValue> {
  public readonly key: string;
  private name: string;
  private value: ObjectValue;
  private schema: DocumentSchema;

  constructor({
    key,
    name,
    value,
    schema,
  }: BuilderConstructorProperties<ObjectValue, DocumentSchema>) {
    this.key = key;
    this.name = name;
    this.value = value;
    this.schema = schema;
  }

  public build() {
    const { type, isUnknown } = this.value;
    const name = isUnknown
      ? `Unknown Document {{ ${type as string} }}`
      : this.name;

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

  public getValue() {
    return documentStore.builder?.getValue() ?? {};
  }
}
