import { ChangeEvent, useState } from "react";
import css from "./file.module.css";

interface FileProps {
  id: string;
  label: string;
  name: string;
  src: string;
  onChange: (file: File) => Promise<void>;
  showName: boolean;
}

export function File({
  id,
  label,
  name,
  onChange,
  showName,
}: Readonly<FileProps>) {
  const [fileName, setFileName] = useState(name);

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const file = event.target.files[0];
      setFileName(file.name);
      onChange(file);
    }
  };

  return (
    <div className={css.container}>
      {showName && <h3 className={css.title}>{label}</h3>}
      <div className={css.fileGroup}>
        <label htmlFor={id} className={css.label}>
          {fileName}
        </label>
        <input
          id={id}
          className={css.input}
          type="file"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
