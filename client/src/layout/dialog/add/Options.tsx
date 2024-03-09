import { ComponentMap } from "@cms/components";
import { SchemaBuilder } from "@cms/schema";
import { arrayStore } from "@cms/stores";
import css from "./options.module.css";

export function Options() {
  const schemaTypes = SchemaBuilder.instance.schemaTypes;

  return (
    <div className={css.options}>
      {schemaTypes.map((type) => (
        <Option key={type} type={type} />
      ))}
    </div>
  );
}

interface OptionProps {
  type: string;
}

function Option({ type }: Readonly<OptionProps>) {
  const schemaBuilder = SchemaBuilder.instance;

  const parentSchemaType = schemaBuilder.getParentSchemaType(type);
  const schema = schemaBuilder.getSchema(type);
  const defaultValue = schemaBuilder.getDefaultValue(type);

  const handleClick = () => {
    const key = `${type}-${crypto.randomUUID()}`;

    arrayStore.addBuilder(
      key,
      new ComponentMap[parentSchemaType]({
        key,
        value: defaultValue,
        name: key,
        showName: false,
        schema,
      })
    );
  };

  return (
    <button className={css.option} onClick={handleClick}>
      {type}
    </button>
  );
}
