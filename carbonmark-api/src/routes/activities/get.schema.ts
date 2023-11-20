import { Type } from "@sinclair/typebox";
import { ActivityModel } from "../../models/Activity.model";
import { NetworkParamModel } from "../../models/NetworkParam.model";

export const QueryString = Type.Object({
  network: Type.Optional(NetworkParamModel),
  projectId: Type.Optional(
    Type.String({
      description:
        "Filter returned activities by project",
    })
  ),
  activityType: Type.Optional(
    Type.String({
      description: "Desired types of the project activities",
    })
  ),
});

export const schema = {
  summary: "List project activities",
  description: "Retrieve an array of activities related to a carbon project",
  tags: ["Activities"],
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
