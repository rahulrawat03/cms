import { Outlet } from "react-router-dom";
import { Dialog } from "./dialog";
import { DocumentPanel } from "./document-panel";
import { Toast } from "./toast";
import css from "./layout.module.css";

export function Layout() {
  return (
    <div className={css.layout}>
      <DocumentPanel />
      <Outlet />
      <Dialog />
      <Toast />
    </div>
  );
}
