import { Link } from "react-router-dom";
import {
  Builder,
  BuilderConstructorProperties,
  ObjectValue,
  Schema,
} from "../../types";
import { ChevronRight } from "react-feather";
import { RootBuilder } from "../../layout";
import { documentStore } from "../../stores";
import css from "./document.module.css";

export class DocumentBuilder implements Builder<ObjectValue> {
  public readonly key: string;
  private name: string;
  private showName: boolean;
  private schema: Schema;

  private builder: RootBuilder;

  constructor({
    key,
    value,
    name,
    showName,
    schema,
  }: BuilderConstructorProperties<ObjectValue>) {
    this.key = key;
    this.name = name;
    this.showName = showName;
    this.schema = schema;

    this.builder = new RootBuilder(schema.properties, value);

    documentStore.registerBuilder(this.key, this.builder);
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
    return this.builder.value() as ObjectValue;
  };
}
