import { Inbox } from "react-feather";
import css from "./empty.module.css";

export function Empty() {
  return (
    <div className={css.empty}>
      <Inbox size={48} />
      <p className={css.text}>Array is empty! Try adding items.</p>
    </div>
  );
}
