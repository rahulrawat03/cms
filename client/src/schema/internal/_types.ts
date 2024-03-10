import { ArraySchema, DocumentSchema, ObjectSchema } from "@cms/types";
import { _Helper } from "./_helper";

export interface _Registry {
  arrayTypes: Map<string, ArraySchema>;
  objectTypes: Map<string, ObjectSchema>;
  documentTypes: Map<string, DocumentSchema>;
  helper: _Helper;
}
