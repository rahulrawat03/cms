import { observer } from "mobx-react-lite";
import { errorStore } from "@cms/stores";
import css from "./toast.module.css";

export const Toast = observer(Component);

function Component() {
  if (!errorStore.currentError) {
    return null;
  }

  return <div className={css.toast}>{errorStore.currentError}</div>;
}
