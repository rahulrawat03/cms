import { useState } from "react";
import css from "./switch.module.css";
import { cls } from "@cms/utils";

interface SwitchProps {
  name: string;
  showName: boolean;
  initialValue: boolean;
  onClick: (value: boolean) => void;
}

export function Switch({
  name,
  showName,
  initialValue,
  onClick,
}: Readonly<SwitchProps>) {
  const [isActive, setIsActive] = useState(initialValue);

  const handleClick = () => {
    onClick(!isActive);
    setIsActive((isActive) => !isActive);
  };

  return (
    <div className={css.switchGroup}>
      {showName && <h3 className={css.title}>{name}</h3>}
      <button
        className={cls(css.switch, isActive ? css.switchActive : "")}
        onClick={handleClick}
      >
        <div className={cls(css.knob, isActive ? css.knobActive : "")} />
      </button>
    </div>
  );
}
