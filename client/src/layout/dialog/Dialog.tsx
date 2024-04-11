import { useClickOutside } from "@cms/hooks";
import { LayerType, dialogStore } from "@cms/stores";
import { useStore } from "@rahulrawat03/mustate";
import { ReactElement, useRef } from "react";
import { Add } from "./add";
import { Close } from "./close";
import css from "./dialog.module.css";
import { Empty } from "./empty";

export function Dialog() {
  useStore([
    {
      store: dialogStore,
      include: ["layers", "trigger"],
    },
  ]);

  const currentLayer = dialogStore.current;
  const dialogRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useClickOutside<void>(() => dialogStore.clear(), dialogRef, wrapperRef);

  if (!currentLayer) {
    return null;
  }

  const elements: ReactElement | null = currentLayer.builder.build();

  return (
    <div ref={wrapperRef} className={css.wrapper}>
      <div ref={dialogRef} className={css.dialog}>
        <div className={css.content}>
          {elements ?? <Empty />}
          <Close />
        </div>
        {currentLayer.type === LayerType.ARRAY && <Add />}
      </div>
    </div>
  );
}
