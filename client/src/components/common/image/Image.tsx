import { ChangeEvent, useState } from "react";
import { Empty } from "./Empty";
import css from "./image.module.css";

interface ImageProps {
  id: string;
  label: string;
  src: string;
  onChange: (file: File) => Promise<void>;
  showName: boolean;
}

export function Image({
  id,
  label,
  src,
  onChange,
  showName,
}: Readonly<ImageProps>) {
  const [imageUrl, setImageUrl] = useState<string>(src);

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const image = event.target.files[0];
      const imageUrl = URL.createObjectURL(image);

      setImageUrl(imageUrl);

      onChange(image);
    }
  };

  return (
    <div className={css.container}>
      {showName && <h3 className={css.title}>{label}</h3>}
      <div className={css.imageGroup}>
        <label htmlFor={id} className={css.label}>
          {imageUrl.length > 0 ? (
            <img src={imageUrl} alt={label} className={css.image} />
          ) : (
            <Empty />
          )}
        </label>
        <input
          id={id}
          className={css.input}
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
