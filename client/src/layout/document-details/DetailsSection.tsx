import { observer } from "mobx-react-lite";
import { SchemaBuilder } from "../../schema";
import { documentStore } from "../../stores";
import { Header } from "./header";
import css from "./document-details.module.css";

export const DetailsSection = observer(Component);

interface DetailsSectionProps {
  id: string;
  type: string;
}

function Component({ id, type }: Readonly<DetailsSectionProps>) {
  const builder = documentStore.getBuilder(id, type);

  if (!(documentStore.currentDocument && builder)) {
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
      <div className={css.documentDetails}>{builder.build()}</div>;
    </div>
  );
}
