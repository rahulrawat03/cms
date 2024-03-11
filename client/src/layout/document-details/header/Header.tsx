import { Delete } from "./delete";
import css from "./header.module.css";
import { Save } from "./save";

interface HeaderProps {
  title: string;
}

export function Header({ title }: Readonly<HeaderProps>) {
  return (
    <header className={css.header}>
      <h2 className={css.title}>{title}</h2>
      <Delete />
      <Save />
    </header>
  );
}
