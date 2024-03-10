import { useAsyncEffect } from "@cms/hooks";
import { documentStore } from "@cms/stores";
import { DocumentList } from "./document-list";
import css from "./document-panel.module.css";
import { Header } from "./header";

export function DocumentPanel() {
  useAsyncEffect<void>(() => documentStore.fetchDocuments(), []);

  return (
    <div className={css.documentPanel}>
      <Header />
      <DocumentList />
    </div>
  );
}
