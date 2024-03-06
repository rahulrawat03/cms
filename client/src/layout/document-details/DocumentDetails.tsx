import { useParams } from "react-router-dom";
import { Constant } from "../../constants";
import { useAsyncEffect } from "../../hooks";
import { documentStore } from "../../stores";
import { DetailsSection } from "./DetailsSection";
import css from "./document-details.module.css";

export function DocumentDetails() {
  const { id, type } = useParams();

  const { loading } = useAsyncEffect<void>(async () => {
    if (id !== Constant.DRAFT) {
      await documentStore.fetchDocument(id ?? "");
    } else {
      documentStore.createDraft(type as string);
    }
  }, [id, type]);

  if (!(id && type && !loading && !documentStore.loadingDocuments)) {
    return <div className={css.documentDetails} />;
  }

  return <DetailsSection id={id} type={type} />;
}
