import { Delete } from "./delete";
import css from "./header.module.css";
import { Save } from "./save";

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
