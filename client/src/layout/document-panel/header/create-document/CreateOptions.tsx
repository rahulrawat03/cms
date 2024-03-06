import { Link } from "react-router-dom";
import { SchemaBuilder } from "../../../../schema";
import { Constant } from "../../../../constants";
import css from "./create-document.module.css";

interface CreateOptionsProps {
  onClick: () => void;
}

export function CreateOptions({ onClick }: CreateOptionsProps) {
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

function Option({ type, onClick }: OptionProps) {
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
