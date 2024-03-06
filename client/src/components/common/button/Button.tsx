import css from "./button.module.css";

interface ButtonProps {
  name: string;
  onClick: () => void;
}

export function Button({ name, onClick }: Readonly<ButtonProps>) {
  return (
    <button className={css.object} onClick={onClick}>
      {name}
    </button>
  );
}
