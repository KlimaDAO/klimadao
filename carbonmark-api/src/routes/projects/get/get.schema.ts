import { Type } from "@sinclair/typebox";
import { ProjectEntry, QueryString } from "src/models/projects.models";

export const schema = {
  summary: "List projects",
  description:
    "Retrieve an array of carbon projects filtered by desired query parameters",
  tags: ["Projects"],
  querystring: QueryString,
  response: {
    200: {
      description: "List of projects",
      content: {
        "application/json": {
          schema: Type.Array(ProjectEntry),
        },
      },
    },
  },
};
