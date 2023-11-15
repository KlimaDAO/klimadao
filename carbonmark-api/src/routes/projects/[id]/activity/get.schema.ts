import { Type } from "@sinclair/typebox";
import { ActivityModel } from "../../../../models/Activity.model";
import { NetworkParamModel } from "../../../../models/NetworkParam.model";
import { Params } from "../get.schema";

export const QueryString = Type.Object({
  network: Type.Optional(NetworkParamModel),
  activity_types: Type.Optional(
    Type.String({
      description: "Desired types of the project activities",
    })
  ),
});

export const schema = {
  summary: "List project acitivities",
  description: "Retrieve an array of activities related to a carbon project",
  tags: ["Activities"],
  params: Params,
  querystring: QueryString,
  response: {
    200: {
      description: "List of project activities",
      content: {
        "application/json": {
          schema: Type.Array(ActivityModel),
        },
      },
    },
  },
};
