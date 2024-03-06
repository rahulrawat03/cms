import { useState } from "react";
import { X } from "react-feather";
import { cls } from "../../../../utils";
import { CreateOptions } from "./CreateOptions";
import css from "./create-document.module.css";

export function CreateDocument() {
  const [createOptionVisibility, setCreateOptionVisibility] = useState(false);

  const handleClick = () => setCreateOptionVisibility(!createOptionVisibility);

  return (
    <div className={css.createDocument}>
      <button
        className={cls(
          css.createDocumentBtn,
          createOptionVisibility ? css.close : ""
        )}
        onClick={handleClick}
      >
        {createOptionVisibility ? <X size={16} /> : "New"}
      </button>
      {createOptionVisibility && <CreateOptions onClick={handleClick} />}
    </div>
  );
}
