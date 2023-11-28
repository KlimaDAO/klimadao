import { Type } from "@sinclair/typebox";
import { ActivityModel } from "../../../../models/Activity.model";
import { QueryString } from "../../../../routes/activities/get.schema";
import { params } from "../get.schema";

export const schema = {
  summary: "List project activities",
  description: "Retrieve an array of activities related to a carbon project",
  tags: ["Activities"],
  params,
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
