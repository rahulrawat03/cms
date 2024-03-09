import { DocumentDetails, Layout } from "@cms/layout";
import { schema } from "@cms/registry";
import { SchemaBuilder } from "@cms/schema";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
