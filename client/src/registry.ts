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
        name: "genre",
        type: "array",
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
        name: "leadActor",
        type: "actor",
      },
    ],
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
        name: "popularMovies",
        type: "array",
      },
    ],
    identifier: "name",
  },
];
