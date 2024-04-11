import { errorStore } from "@cms/stores";
import { useStore } from "@rahulrawat03/mustate";
import css from "./toast.module.css";

export function Toast() {
  useStore([
    {
      store: errorStore,
      include: ["_currentError"],
    },
  ]);

  if (!errorStore.currentError) {
    return null;
  }

  return <div className={css.toast}>{errorStore.currentError}</div>;
}
