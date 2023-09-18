import { Type } from "@sinclair/typebox";
import { UserModel } from "../../models/User.model";

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
  type: Type.Optional(
    Type.Union([Type.Literal("wallet"), Type.Literal("handle")], {
      description:
        "When providing an wallet `0x` address instead of a handle, you must attach the `type=wallet` query parameter",
      examples: ["wallet", "handle"],
    })
  ),
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
          schema: UserModel,
        },
      },
    },
  },
};
