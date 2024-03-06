import { X } from "react-feather";
import { dialogStore } from "../../../stores";
import css from "./close.module.css";

export function Close() {
  return (
    <button className={css.close} onClick={dialogStore.remove}>
      <X size={24} />
    </button>
  );
}
