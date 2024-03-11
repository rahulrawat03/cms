import { Loader, LoaderVariant } from "@cms/components";
import { Constant } from "@cms/constants";
import { documentStore } from "@cms/stores";
import { cls } from "@cms/utils";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import btnCss from "../header.module.css";
import css from "./save.module.css";

export function Save() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);

  const handleClick = async () => {
    if (saving) {
      return;
    }

    setSaving(true);

    if (id === Constant.DRAFT) {
      const { id, type } = (await documentStore.createDocument()) ?? {};

      if (id && type) {
        navigate(`/${type}/${id}`, { replace: true });
      }
    } else {
      await documentStore.updateDocument();
    }

    setSaving(false);
  };

  return (
    <button className={cls(css.save, btnCss.button)} onClick={handleClick}>
      {saving ? <Loader variant={LoaderVariant.DOT} /> : "Save"}
    </button>
  );
}
