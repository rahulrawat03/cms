import { observer } from "mobx-react-lite";
import { DocumentBuilder } from "@cms/components";
import { SchemaBuilder } from "@cms/schema";
import { documentStore } from "@cms/stores";
import css from "./document-list.module.css";

export const DocumentList = observer(Component);

function Component() {
  const documents = documentStore.documents;
  const documentBuilders = documents.map(({ id, type, identifier }) => {
    const schema = SchemaBuilder.instance.getSchema(type, true);

    return new DocumentBuilder({
      key: id.toString(),
      value: { type, isUnknown: schema.type !== type },
      name: identifier,
      showName: true,
      schema,
    });
  });

  return (
    <div className={css.documentList}>
      {documentBuilders.map((builder) => builder.build())}
    </div>
  );
}
