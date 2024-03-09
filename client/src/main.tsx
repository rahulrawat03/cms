import { App, ErrorBoundary } from "@cms/app";
import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
