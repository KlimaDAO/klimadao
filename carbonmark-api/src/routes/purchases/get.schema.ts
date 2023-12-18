import { Static, Type } from "@sinclair/typebox";
import { NetworkParamModel } from "../../models/NetworkParam.model";
import { PurchaseModel } from "../../models/Purchase.model";

export const querystring = Type.Object({
  network: Type.Optional(Type.Ref(NetworkParamModel)),
});
export type Querystring = Static<typeof querystring>;
export const schema = {
  summary: "Purchase details",
  description:
    "Retrieve the details of a purchase by its ID (transaction hash)",
  querystring,
  response: {
    200: {
      description: "Successful response with listing details",
      content: {
        "application/json": {
          schema: Type.Array(PurchaseModel),
        },
      },
    },
  },
};
