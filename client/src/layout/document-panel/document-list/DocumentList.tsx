import { DocumentBuilder } from "@cms/components";
import { SchemaBuilder } from "@cms/schema";
import { documentStore } from "@cms/stores";
import { DocumentSchema } from "@cms/types";
import { useStore } from "@rahulrawat03/mustate";
import css from "./document-list.module.css";

export function DocumentList() {
  useStore([
    {
      store: documentStore,
      include: ["_documents", "searchQuery"],
    },
  ]);

  const documentBuilders = documentStore.documents.map(
    ({ id, type, identifier }) => {
      const schema = SchemaBuilder.instance.getSchema(
        type,
        true
      ) as DocumentSchema;

      return new DocumentBuilder({
        key: id.toString(),
        value: { type, isUnknown: schema.type !== type },
        name: identifier,
        showName: true,
        schema,
      });
    }
  );

  return (
    <div className={css.documentList}>
      {documentBuilders.map((builder) => builder.build())}
    </div>
  );
}
