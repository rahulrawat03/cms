import css from "./input.module.css";

interface InputProps {
  id: string;
  name: string;
  initialValue: string | number;
  setValue: (value: string | number) => void;
  type: "string" | "number";
  showName: boolean;
}

export function Input({
  id,
  name,
  initialValue,
  setValue,
  type,
  showName,
}: Readonly<InputProps>) {
  return (
    <div className={css.inputGroup}>
      {showName && (
        <label htmlFor={id} className={css.inputLabel}>
          {name}
        </label>
      )}
      <input
        id={id}
        type={type}
        defaultValue={initialValue}
        className={css.input}
        onChange={(event) => {
          if (type === "number") {
            const value = parseFloat(event.target.value);
            setValue(isNaN(value) ? 0 : value);
          } else {
            setValue(event.target.value);
          }
        }}
      />
    </div>
  );
}
