import { ChangeEvent } from "react";
import { documentStore } from "../../../../stores";
import css from "./search.module.css";

export function Search() {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    documentStore.query = event.target.value;
  };

  return (
    <div className={css.search}>
      <input
        type="string"
        className={css.input}
        onChange={handleChange}
        placeholder={"Search..."}
      />
    </div>
  );
}
