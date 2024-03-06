import { useState } from "react";
import { Options } from "./Options";
import css from "./add.module.css";

export function Add() {
  const [optionsVisibility, setOptionsVisibility] = useState(false);

  const handleClick = () => setOptionsVisibility(!optionsVisibility);

  return (
    <div className={css.add}>
      {optionsVisibility && <Options />}
      <button className={css.addButton} onClick={handleClick}>
        {optionsVisibility ? "close" : "add"}
      </button>
    </div>
  );
}
