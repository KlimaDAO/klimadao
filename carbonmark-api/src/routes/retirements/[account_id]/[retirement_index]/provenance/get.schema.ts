import { Type } from "@sinclair/typebox";
import { RecordModel } from "../../../../../models/Record.model";
import { params, querystring } from "../get.schema";

export const schema = {
  summary: "Retirement provenance records",
  description: "Retrieve a retirement provenance records",
  tags: ["Records"],
  params,
  querystring,
  response: {
    200: {
      description:
        "Retirement provenance record with account id and retirement index",
      content: {
        "application/json": {
          schema: Type.Array(RecordModel),
        },
      },
    },
  },
};
