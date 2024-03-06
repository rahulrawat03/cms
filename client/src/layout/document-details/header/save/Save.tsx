import { useNavigate, useParams } from "react-router-dom";
import { Constant } from "../../../../constants";
import { documentStore } from "../../../../stores";
import { cls } from "../../../../utils";
import btnCss from "../header.module.css";
import css from "./save.module.css";

export function Save() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleClick = async () => {
    if (id === Constant.DRAFT) {
      const { id, type } = (await documentStore.createDocument()) || {};

      if (id && type) {
        navigate(`/${type}/${id}`, { replace: true });
      }
    } else {
      await documentStore.updateDocument();
    }
  };

  return (
    <button className={cls(css.save, btnCss.button)} onClick={handleClick}>
      Save
    </button>
  );
}
