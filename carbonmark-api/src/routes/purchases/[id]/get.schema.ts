import { Static, Type } from "@sinclair/typebox";
import { NetworkParamModel } from "../../../models/NetworkParam.model";
import { PurchaseModel } from "../../../models/Purchase.model";

const params = Type.Object(
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

export const querystring = Type.Object({
  network: Type.Optional(Type.Ref(NetworkParamModel)),
});

export const schema = {
  summary: "Purchase details",
  description:
    "Retrieve the details of a purchase by its ID (transaction hash)",
  querystring,
  params,
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

export type Querystring = Static<typeof querystring>;
export type Params = Static<typeof params>;
