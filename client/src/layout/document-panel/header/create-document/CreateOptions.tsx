import { Constant } from "@cms/constants";
import { SchemaBuilder } from "@cms/schema";
import { Link } from "react-router-dom";
import css from "./create-document.module.css";

interface CreateOptionsProps {
  onClick: () => void;
}

export function CreateOptions({ onClick }: Readonly<CreateOptionsProps>) {
  const documentSchemaTypes = SchemaBuilder.instance.documentSchemaTypes;

  return (
    <ul className={css.createOptions}>
      {documentSchemaTypes.map((type) => (
        <Option key={type} type={type} onClick={onClick} />
      ))}
    </ul>
  );
}

interface OptionProps {
  type: string;
  onClick: () => void;
}

function Option({ type, onClick }: Readonly<OptionProps>) {
  return (
    <li className={css.createOptionWrapper}>
      <Link
        to={`/${type}/${Constant.DRAFT}`}
        onClick={onClick}
        className={css.createOption}
      >
        {type}
      </Link>
    </li>
  );
}
