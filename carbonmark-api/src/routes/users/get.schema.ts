import { Type } from "@sinclair/typebox";
import { NetworkParamModel } from "../../models/NetworkParam.model";
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
  network: Type.Optional(NetworkParamModel),
  expiresAfter: Type.Optional(
    Type.String({
      description:
        "Only return listings that expire after this timestamp (Unix seconds)",
      default: "Current system timestamp.",
      examples: ["1620000000"],
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
