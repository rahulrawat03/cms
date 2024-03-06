import { documentStore } from "../../stores";
import { useAsyncEffect } from "../../hooks";
import { Header } from "./header";
import { DocumentList } from "./document-list";
import css from "./document-panel.module.css";

export function DocumentPanel() {
  useAsyncEffect<void>(documentStore.fetchDocuments, []);

  return (
    <div className={css.documentPanel}>
      <Header />
      <DocumentList />
    </div>
  );
}
