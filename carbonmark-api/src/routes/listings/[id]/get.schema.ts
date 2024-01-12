import { Static, Type } from "@sinclair/typebox";
import { ListingModel } from "../../../models/Listing.model";
import { NetworkParamModel } from "../../../models/NetworkParam.model";

export const params = Type.Object(
  {
    id: Type.String({
      description: "The listing id",
      examples: [
        "0xde5c717958a9a80f2dee8ebcc6f411a8d860ac7b0042e45487f4ad2afaf46d5a",
      ],
    }),
  },
  { required: ["id"] }
);

export type Params = Static<typeof params>;

export const querystring = Type.Object({
  network: Type.Optional(Type.Ref(NetworkParamModel)),
});

export type Querystring = Static<typeof querystring>;

export const schema = {
  summary: "Listing",
  description: "Get a listing by its identifier",
  tags: ["Listing"],
  querystring,
  params,
  response: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          schema: ListingModel,
        },
      },
    },
  },
};
