import { Loader } from "@cms/components";
import { LoaderVariant } from "@cms/components/common/loader/types";
import { Constant } from "@cms/constants";
import { useAsyncEffect } from "@cms/hooks";
import { documentStore } from "@cms/stores";
import { useParams } from "react-router-dom";
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

  if (!(id && type && !loading)) {
    return (
      <div className={css.documentDetails}>
        <Loader variant={LoaderVariant.LARGE} />
      </div>
    );
  }

  return <DetailsSection type={type} />;
}
