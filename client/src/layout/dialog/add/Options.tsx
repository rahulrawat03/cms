import { ComponentMap } from "../../../components";
import { SchemaBuilder } from "../../../schema";
import { dialogStore } from "../../../stores";
import { SchemaType } from "../../../types";
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
  const defaultValue = schemaBuilder.getDefaultValue(
    parentSchemaType as SchemaType
  );

  const handleClick = () => {
    const key = `${type}-${crypto.randomUUID()}`;

    dialogStore.addBuilder(
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
