import { SchemaBuilder } from "@cms/schema";
import { documentStore } from "@cms/stores";
import { useStore } from "@rahulrawat03/mustate";
import css from "./document-details.module.css";
import { Header } from "./header";

interface DetailsSectionProps {
  type: string;
}

export function DetailsSection({ type }: Readonly<DetailsSectionProps>) {
  useStore([
    {
      store: documentStore,
      include: ["_builder", "_currentDocument"],
    },
  ]);

  if (!(documentStore.currentDocument && documentStore.builder)) {
    return <div className={css.documentDetails} />;
  }

  const schemaBuilder = SchemaBuilder.instance;
  const schema = schemaBuilder.getSchema(type);
  if (!schema) {
    return <div className={css.documentDetails} />;
  }

  return (
    <div>
      <Header title={type} />
      <div className={css.documentDetails}>{documentStore.builder.build()}</div>
    </div>
  );
}
