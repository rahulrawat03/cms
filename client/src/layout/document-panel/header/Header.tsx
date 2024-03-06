import { CreateDocument } from "./create-document";
import { Search } from "./search";
import css from "./header.module.css";

export function Header() {
  return (
    <div className={css.header}>
      <Search />
      <CreateDocument />
    </div>
  );
}
