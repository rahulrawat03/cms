import { Constant } from "@cms/constants";
import { documentStore } from "@cms/stores";
import { cls } from "@cms/utils";
import { useNavigate, useParams } from "react-router-dom";
import btnCss from "../header.module.css";
import css from "./delete.module.css";

export function Delete() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleClick = async () => {
    if (id === Constant.DRAFT) {
      navigate(-1);
      return;
    }

    const response = await documentStore.deleteDocument();

    if (!response) {
      return;
    }

    if (response.id >= 0) {
      navigate(`/${response.type}/${response.id}`, { replace: true });
    } else {
      navigate(`/`, { replace: true });
    }
  };

  return (
    <button onClick={handleClick} className={cls(css.delete, btnCss.button)}>
      Delete
    </button>
  );
}
