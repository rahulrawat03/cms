import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../layout/Layout";
import { DocumentDetails } from "../layout/document-details";
import { SchemaBuilder } from "../schema";
import { schema } from "../registry";

export function App() {
  SchemaBuilder.init(schema);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/:type/:id" element={<DocumentDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
