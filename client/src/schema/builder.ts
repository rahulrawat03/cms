import { Constant } from "../constants";
import {
  ArraySchema,
  DocumentSchema,
  ObjectSchema,
  Schema,
  Value,
} from "../types";
import { _Helper, _Registry, _Schema, _Validation, _Value } from "./internal";

export class SchemaBuilder {
  private static _instance: SchemaBuilder;

  public static get instance() {
    return this._instance;
  }

  public static init(schemas: Schema[]) {
    this._instance = new SchemaBuilder(schemas);
  }

  private arrayTypes = new Map<string, ArraySchema>();
  private objectTypes = new Map<string, ObjectSchema>();
  private documentTypes = new Map<string, DocumentSchema>();

  private schema: _Schema;
  private value: _Value;
  private helper: _Helper;

  private constructor(public schemas: Schema[]) {
    this.helper = new _Helper();

    const registry = {
      arrayTypes: this.arrayTypes,
      objectTypes: this.objectTypes,
      documentTypes: this.documentTypes,
      helper: this.helper,
    };

    this.validate(registry);

    this.schema = new _Schema(registry);

    this.value = new _Value(this.schema);
  }

  private validate(registry: _Registry) {
    const validation = new _Validation(registry);

    for (const schema of this.schemas) {
      validation.populateTypes(schema, schema.as);
    }

    validation.validateDuplicateProperties(this.schemas);
    validation.validateUnregisteredTypes(this.schemas);
  }

  public get schemaTypes() {
    return <const>[
      ...Constant.PRIMITIVE_SCHEMA_TYPES,
      ...this.objectTypes.keys(),
    ];
  }

  public get documentSchemaTypes() {
    return <const>[...this.documentTypes.keys()];
  }

  public getSchema(type: string, document: boolean = false) {
    return this.schema.getSchema(type, document);
  }

  public getWrapperSchemaType(type: string) {
    return this.schema.getWrapperSchemaType(type);
  }

  public inferWrapperSchemaType(value: Value) {
    return this.schema.inferWrapperSchemaType(value);
  }

  public inferSchemaType(value: Value) {
    return this.schema.inferSchemaType(value);
  }

  public getDefaultValue(type: string) {
    return this.value.getValue(type);
  }

  public isPrimitiveType(type: string) {
    return this.helper.isPrimitiveType(type);
  }

  public isArrayType(type: string) {
    return this.helper.isArrayType(type);
  }

  public isObjectType(type: string) {
    return this.helper.isObjectType(type);
  }
}
