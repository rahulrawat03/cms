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
        type: "string",
      },
      {
        name: "rentalRate",
        type: "number",
      },
      {
        name: "actors",
        type: "array",
      },
      {
        name: "criticsReview",
        type: "critics",
      },
    ],
  },
  {
    type: "country",
    as: "document",
    identifier: "name",
    properties: [
      {
        name: "name",
        type: "string",
      },
      {
        name: "averageMoviesPerYear",
        type: "number",
      },
      {
        name: "averageImdbRatingPerMovie",
        type: "number",
      },
      {
        name: "bigggestSuccesses",
        type: "array",
      },
    ],
  },
  {
    type: "critics",
    as: "object",
    properties: [
      {
        name: "Critic A",
        type: "number",
      },
      {
        name: "Critic B",
        type: "number",
      },
      {
        name: "Critic C",
        type: "number",
      },
    ],
  },
];
