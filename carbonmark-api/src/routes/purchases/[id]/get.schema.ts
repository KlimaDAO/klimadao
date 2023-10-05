import { Static, Type } from "@sinclair/typebox";
import { PurchaseModel } from "../../../models/Purchase.model";

const Params = Type.Object(
  {
    id: Type.String({
      description: "ID (transaction hash) of the purchase to retrieve",
      examples: [
        "0x2821a317b0166e40eff697c209c4534bbfa1c1fbd418255b2be24443b146a60f",
      ],
    }),
  },
  {
    required: ["id"],
  }
);

export const schema = {
  summary: "Purchase details",
  description:
    "Retrieve the details of a purchase by its ID (transaction hash)",
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
