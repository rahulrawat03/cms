import { Save } from "./save";
import css from "./header.module.css";
import { Delete } from "./delete";

interface HeaderProps {
  title: string;
}

export function Header({ title }: Readonly<HeaderProps>) {
  return (
    <header className={css.header}>
      {title}
      <div>
        <Delete />
        <Save />
      </div>
    </header>
  );
}
