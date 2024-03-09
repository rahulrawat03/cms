import { SchemaBuilder } from "@cms/schema";
import { documentStore } from "@cms/stores";
import { observer } from "mobx-react-lite";
import css from "./document-details.module.css";
import { Header } from "./header";

export const DetailsSection = observer(Component);

interface DetailsSectionProps {
  type: string;
}

function Component({ type }: Readonly<DetailsSectionProps>) {
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
