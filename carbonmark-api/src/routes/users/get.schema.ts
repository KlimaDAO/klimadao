import { Type } from "@sinclair/typebox";
import { Activity } from "src/models/Activity.model";
import { Listing } from "src/models/Listing.model";

export const User = Type.Object({
  handle: Type.String(),
  username: Type.String(),
  description: Type.String(),
  profileImgUrl: Type.Union([Type.String(), Type.Null()]),
  updatedAt: Type.Number(),
  createdAt: Type.Number(),
  wallet: Type.String(),
  listings: Type.Array(Listing),
  activities: Type.Array(Activity),
  //@todo replace unknown with Holding model type
  assets: Type.Array(Type.Unknown()),
});

export const Params = Type.Object(
  {
    walletOrHandle: Type.String({
      description: "A user handle or wallet address",
      examples: ["atmosfearful", "0xAb5B7b5849784279280188b556AF3c179F31Dc5B"],
    }),
  },
  { required: ["walletOrHandle"] }
);

export const QueryString = Type.Object({
  type: Type.String({
    description:
      "When providing an wallet `0x` address instead of a handle, you must attach the `type=wallet` query parameter",
    examples: ["wallet"],
  }),
});

export const schema = {
  summary: "User details",
  description: "Get a user's profile and activity",
  tags: ["Users"],
  querystring: QueryString,
  params: Params,
  response: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          schema: User,
        },
      },
    },
  },
};
