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
  private showName: boolean;
  private schema: Schema;

  constructor({
    key,
    name,
    showName,
    schema,
  }: BuilderConstructorProperties<ObjectValue>) {
    this.key = key;
    this.name = name;
    this.showName = showName;
    this.schema = schema;
  }

  public build = () => {
    return (
      <Link
        key={this.key}
        to={`/${this.schema.type}/${this.key}`}
        className={css.document}
      >
        <h3 className={css.documentTitle}>{this.showName && this.name}</h3>
        <ChevronRight />
      </Link>
    );
  };

  public value = () => {
    return (documentStore.builder?.value() ?? {}) as ObjectValue;
  };
}
