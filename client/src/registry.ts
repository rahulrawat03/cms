import { Schema } from "./types";

/**
 * Sample Schema
 */
export const schema: Schema[] = [
  {
    type: "movie",
    as: "document",
    identifier: "title",
    properties: [
      {
        name: "title",
        type: "string",
      },
      {
        name: "rating",
        type: "number",
      },
      {
        name: "poster",
        type: "image",
      },
      {
        name: "trailer",
        type: "file",
      },
      {
        name: "genre",
        type: "genre",
      },
      {
        name: "actors",
        type: "actors",
      },
    ],
  },
  {
    type: "genre",
    as: "array",
    allowedTypes: ["string"],
  },
  {
    type: "actor",
    as: "object",
    properties: [
      {
        name: "name",
        type: "string",
      },
      {
        name: "totalMovies",
        type: "number",
      },
      {
        name: "photo",
        type: "image",
      },
    ],
  },
  {
    type: "actors",
    as: "array",
    allowedTypes: ["actor"],
  },
];
