import {
  ArraySchema,
  DocumentSchema,
  ObjectSchema,
  Schema,
  SchemaType,
} from "@cms/types";
import { _Helper } from "./_helper";
import { _Registry } from "./_types";

export class _Validation {
  private arrayTypes = new Map<string, ArraySchema>();
  private objectTypes = new Map<string, ObjectSchema>();
  private documentTypes = new Map<string, DocumentSchema>();

  private helper: _Helper;

  constructor({ arrayTypes, objectTypes, documentTypes, helper }: _Registry) {
    this.arrayTypes = arrayTypes;
    this.objectTypes = objectTypes;
    this.documentTypes = documentTypes;

    this.helper = helper;
  }

  public populateTypes(schema: Schema, as: string) {
    switch (as) {
      case "array":
        this.validateAndPopulateArraySchema(schema as ArraySchema);
        break;

      case "document":
        this.validateAndPopulateDocumentSchema(schema as DocumentSchema);
        break;

      case "object":
        this.validateAndPopulateObjectSchema(schema as ObjectSchema);
        break;

      // Primitive Type
      default:
        throw new Error(`Invalid wrapper type "${schema.type}" chosen.`);
    }
  }

  private validateAndPopulateDocumentSchema(schema: DocumentSchema) {
    const { type } = schema;

    if (this.documentTypes.has(type)) {
      throw new Error(
        `Document of type "${type}" is registered multiple times.`
      );
    }

    if (!schema.properties) {
      throw new Error(
        `Document of type "${type}" has no properties specified.`
      );
    }

    if (!schema.identifier) {
      throw new Error(
        `Document of type "${type}" has no identifier specified.`
      );
    }

    const identifierProperty = schema.properties.find(
      ({ name }) => name === schema.identifier
    );

    if (!identifierProperty) {
      throw new Error(
        `Document of type "${type}" has no property corresponding to the identifier "${schema.identifier}".`
      );
    }

    if (identifierProperty.type !== SchemaType.STRING) {
      throw new Error(
        `Identifier can only be of type "string". Document of type "${type}" specifies identifier of type "${identifierProperty.type}".`
      );
    }

    this.documentTypes.set(type, schema);
  }

  private validateAndPopulateObjectSchema(schema: ObjectSchema) {
    const { type } = schema;

    if (this.objectTypes.has(type)) {
      throw new Error(`Object of type "${type}" is registered multiple times.`);
    }

    if (!schema.properties) {
      throw new Error(`Object of type "${type}" has no properties specified.`);
    }

    this.objectTypes.set(type, schema);
  }

  private validateAndPopulateArraySchema(schema: ArraySchema) {
    const { type } = schema;

    if (this.arrayTypes.has(type)) {
      throw new Error(`Array of type "${type}" is registered multiple times.`);
    }

    if (!schema.allowedTypes) {
      throw new Error(
        `Array of type "${type}" has not been provided any allowed types.`
      );
    }

    // Dedupe the allowed types
    const uniqueTypes = new Set(schema.allowedTypes);
    schema.allowedTypes.length = 0;
    schema.allowedTypes.push(...uniqueTypes);

    this.arrayTypes.set(type, schema);
  }

  public validateDuplicateProperties(schemas: Schema[]) {
    for (const schema of schemas) {
      const registeredProperties = new Set<string>();
      const properties = schema.properties ?? [];

      for (const { name } of properties) {
        if (registeredProperties.has(name)) {
          throw new Error(`
            Schema "${schema.type}" has duplicate properties by name "${name}"
          `);
        }

        registeredProperties.add(name);
      }
    }
  }

  public validateUnregisteredTypes(schemas: Schema[]) {
    const unregisteredTypes = new Set<string>();

    for (const schema of schemas) {
      let types: string[] = [];

      if (this.helper.isArrayType(schema.as)) {
        types = schema.allowedTypes ?? [];
      } else if (!this.helper.isPrimitiveType(schema.type)) {
        types = (schema.properties ?? []).map(({ type }) => type);
      }

      for (const type of types) {
        if (
          !this.documentTypes.has(type) &&
          !this.objectTypes.has(type) &&
          !this.arrayTypes.has(type) &&
          !this.helper.isPrimitiveType(type)
        ) {
          unregisteredTypes.add(type);
        }
      }
    }

    if (unregisteredTypes.size > 0) {
      throw new Error(`Unregistered type(s) found: ${[...unregisteredTypes]}`);
    }
  }
}
