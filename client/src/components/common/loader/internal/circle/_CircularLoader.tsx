import { cls } from "@cms/utils";
import css from "./circular-loader.module.css";

export function _CircularLoader() {
  return (
    <div className={css.wrapper}>
      <div className={cls(css.circle, css.container)}>
        <div className={css.circleLarge} />
        <div className={css.circleMedium} />
        <div className={css.circleSmall} />
      </div>
    </div>
  );
}
