import { observer } from "mobx-react-lite";
import { DocumentBuilder } from "@cms/components";
import { SchemaBuilder } from "@cms/schema";
import { documentStore } from "@cms/stores";
import css from "./document-list.module.css";

export const DocumentList = observer(Component);

function Component() {
  const documents = documentStore.documents;
  const documentBuilders = documents.map(
    ({ id, type, identifier }) =>
      new DocumentBuilder({
        key: id.toString(),
        value: { type },
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
