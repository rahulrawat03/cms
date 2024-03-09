import { CreateDocument } from "./create-document";
import css from "./header.module.css";
import { Search } from "./search";

export function Header() {
  return (
    <div className={css.header}>
      <Search />
      <CreateDocument />
    </div>
  );
}
