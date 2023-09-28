import { Static, Type } from "@sinclair/typebox";
import { CommonSchema } from "../../../models/CommonSchema.model";
import { PurchaseModel } from "../../../models/Purchase.model";

const Params = Type.Object(
  {
    id: Type.String({
      description: "ID (transaction hash) of the purchase to retrieve",
      examples: [
        "0xcad9383fba33aaad6256304ef7b103f3f00b21afbaffbbff14423bf074b699e8",
      ],
    }),
  },
  {
    required: ["id"],
  }
);

export const Querystring = CommonSchema;

export const schema = {
  summary: "Purchase details",
  description:
    "Retrieve the details of a purchase by its ID (transaction hash)",
  querystring: Querystring,
  params: Params,
  response: {
    200: {
      description: "Successful response with listing details",
      content: {
        "application/json": {
          schema: PurchaseModel,
        },
      },
    },
  },
};

export type ParamsT = Static<typeof Params>;
