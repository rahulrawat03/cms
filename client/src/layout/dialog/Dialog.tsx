import { observer } from "mobx-react-lite";
import { ReactElement, useRef } from "react";
import { useClickOutside } from "../../hooks";
import { dialogStore } from "../../stores";
import { LayerType } from "../../stores/dialog/types";
import { Add } from "./add";
import { Close } from "./close";
import { Empty } from "./empty";
import css from "./dialog.module.css";

export const Dialog = observer(Component);

function Component() {
  const currentLayer = dialogStore.current;
  dialogStore.trigger;

  const dialogRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useClickOutside<void>(dialogStore.clear, dialogRef, wrapperRef);

  if (!currentLayer) {
    return null;
  }

  const elements: ReactElement | null = currentLayer.builder.build();

  return (
    <div ref={wrapperRef} className={css.wrapper}>
      <div ref={dialogRef} className={css.dialog}>
        <div className={css.content}>
          {elements || <Empty />}
          <Close />
        </div>
        {currentLayer.type === LayerType.ARRAY && <Add />}
      </div>
    </div>
  );
}
