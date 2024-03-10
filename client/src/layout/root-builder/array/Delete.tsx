import { arrayStore } from "@cms/stores";
import { Trash } from "react-feather";
import css from "./array.module.css";

interface DeleteProps {
  itemIndex: number;
}

export function Delete({ itemIndex }: Readonly<DeleteProps>) {
  const deleteItem = () => {
    arrayStore.delete(itemIndex);
  };

  return <Trash size={16} className={css.delete} onClick={deleteItem} />;
}
