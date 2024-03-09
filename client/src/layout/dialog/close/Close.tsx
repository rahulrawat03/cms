import { X } from "react-feather";
import { dialogStore } from "@cms/stores";
import css from "./close.module.css";

export function Close() {
  return (
    <button className={css.close} onClick={dialogStore.remove}>
      <X size={24} />
    </button>
  );
}
