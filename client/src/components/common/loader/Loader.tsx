import { cls } from "@cms/utils";
import css from "./loader.module.css";
import { LoaderVariant } from "./types";

interface LoaderProps {
  variant?: LoaderVariant;
}

export function Loader({
  variant = LoaderVariant.SMALL,
}: Readonly<LoaderProps>) {
  let className = "";

  switch (variant) {
    case LoaderVariant.LARGE:
      className = css.large;
      break;
    case LoaderVariant.MEDIUM:
      className = css.medium;
      break;
    case LoaderVariant.SMALL:
    default:
      className = css.small;
  }

  return (
    <div className={css.wrapper}>
      <div className={cls(className, css.container)}>
        <div className={css.circleLarge} />
        <div className={css.circleMedium} />
        <div className={css.circleSmall} />
      </div>
    </div>
  );
}
