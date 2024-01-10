import { Static, Type } from "@sinclair/typebox";
import { NetworkParamModel } from "../../models/NetworkParam.model";
import { ProjectModel } from "../../models/Project.model";

export const querystring = Type.Object({
  network: Type.Optional(Type.Ref(NetworkParamModel)),
  country: Type.Optional(
    Type.String({
      description: "Desired country of origin for carbon projects",
    })
  ),
  category: Type.Optional(
    Type.String({
      description: "Desired category of carbon projects",
    })
  ),
  search: Type.Optional(
    Type.String({
      description:
        "Search carbon project names and descriptions for a string of text",
    })
  ),
  vintage: Type.Optional(
    Type.String({
      description: "Desired vintage of carbon projects",
    })
  ),
  expiresAfter: Type.Optional(
    Type.String({
      description:
        "Only return projects listings that expire after this timestamp (Unix seconds)",
      examples: ["1620000000"],
    })
  ),
  minSupply: Type.Optional(
    Type.Number({
      description:
        "Only return projects listings and pools that contains at least this amount of credits (Tonnes)",
      minimum: 0,
      examples: ["0"],
    })
  ),
});

export type Querystring = Static<typeof querystring>;

export const schema = {
  summary: "List projects",
  description:
    "Retrieve an array of carbon projects filtered by desired query parameters",
  tags: ["Projects"],
  querystring,
  response: {
    200: {
      description: "List of projects",
      content: {
        "application/json": {
          schema: Type.Array(ProjectModel),
        },
      },
    },
  },
};
