import { Schema } from "@cms/types";

export const schemas: Schema[] = [
  {
    type: "page",
    as: "document",
    identifier: "title",
    properties: [
      {
        name: "title",
        type: "string",
      },
      {
        name: "articles",
        type: "number",
      },
      {
        name: "notes",
        type: "array",
      },
    ],
  },
  {
    type: "keys",
    as: "document",
    identifier: "key",
    properties: [
      {
        name: "key",
        type: "string",
      },
      {
        name: "value",
        type: "string",
      },
      {
        name: "key1",
        type: "string",
      },
      {
        name: "key2",
        type: "string",
      },
      {
        name: "key3",
        type: "string",
      },
      {
        name: "key4",
        type: "string",
      },
      {
        name: "key5",
        type: "string",
      },
      {
        name: "ref",
        type: "references",
      },
    ],
  },
  {
    type: "references",
    as: "object",
    properties: [
      {
        name: "first",
        type: "string",
      },
      {
        name: "second",
        type: "string",
      },
      {
        name: "nestedOne",
        type: "referenceLevelOne",
      },
    ],
  },
  {
    type: "referenceLevelOne",
    as: "object",
    properties: [
      {
        name: "first",
        type: "string",
      },
      {
        name: "second",
        type: "string",
      },
      {
        name: "nestedTwo",
        type: "referenceLevelTwo",
      },
    ],
  },
  {
    type: "referenceLevelTwo",
    as: "object",
    properties: [
      {
        name: "first",
        type: "string",
      },
      {
        name: "second",
        type: "string",
      },
      {
        name: "nestedThree",
        type: "usual",
      },
    ],
  },
  {
    type: "usual",
    as: "object",
    properties: [
      {
        name: "first",
        type: "string",
      },
      {
        name: "second",
        type: "string",
      },
    ],
  },
];
