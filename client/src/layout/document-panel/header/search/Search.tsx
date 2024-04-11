import { documentStore } from "@cms/stores";
import { ChangeEvent } from "react";
import css from "./search.module.css";

export function Search() {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    documentStore.setQuery(event.target.value);
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
