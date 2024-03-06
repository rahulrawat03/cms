import { Outlet } from "react-router-dom";
import { DocumentPanel } from "./document-panel";
import { Dialog } from "./dialog";
import css from "./layout.module.css";

export function Layout() {
  return (
    <div className={css.layout}>
      <DocumentPanel />
      <Outlet />
      <Dialog />
    </div>
  );
}
