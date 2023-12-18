import { Static, Type } from "@sinclair/typebox";
import { NetworkParamModel } from "../../models/NetworkParam.model";
import { PurchaseModel } from "../../models/Purchase.model";

export const querystring = Type.Object({
  network: Type.Optional(Type.Ref(NetworkParamModel)),
});
export type Querystring = Static<typeof querystring>;
export const schema = {
  summary: "Recent purchases",
  description: "Retrieve a list of recent purchases",
  querystring,
  response: {
    200: {
      description: "A ordered list of recent purchases and their projects",
      content: {
        "application/json": {
          schema: Type.Array(PurchaseModel),
        },
      },
    },
  },
};
