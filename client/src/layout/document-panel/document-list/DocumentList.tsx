import { observer } from "mobx-react-lite";
import { DocumentBuilder } from "../../../components";
import { SchemaBuilder } from "../../../schema";
import { documentStore } from "../../../stores";
import { ObjectValue } from "../../../types";
import css from "./document-list.module.css";

export const DocumentList = observer(Component);

function Component() {
  const documents = documentStore.documents;
  const documentBuilders = documents.map(
    ({ id, type, data, identifier }) =>
      new DocumentBuilder({
        key: id.toString(),
        value: data as ObjectValue,
        name: identifier,
        showName: true,
        schema: SchemaBuilder.instance.getSchema(type),
      })
  );

  return (
    <div className={css.documentList}>
      {documentBuilders.map((builder) => builder.build())}
    </div>
  );
}
