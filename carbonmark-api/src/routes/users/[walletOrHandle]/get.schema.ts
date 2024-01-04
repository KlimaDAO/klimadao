import { Static, Type } from "@sinclair/typebox";
import { NetworkParamModel } from "../../../models/NetworkParam.model";
import { UserModel } from "../../../models/User.model";

export const params = Type.Object(
  {
    walletOrHandle: Type.String({
      description: "A user handle or wallet address",
      examples: ["atmosfearful", "0xAb5B7b5849784279280188b556AF3c179F31Dc5B"],
    }),
  },
  { required: ["walletOrHandle"] }
);

export type Params = Static<typeof params>;

export const querystring = Type.Object({
  network: Type.Optional(Type.Ref(NetworkParamModel)),
  expiresAfter: Type.Optional(
    Type.String({
      description:
        "Only return listings that expire after this timestamp (Unix seconds)",
      examples: ["1620000000"],
    })
  ),
  minSupply: Type.Optional(
    Type.Number({
      description:
        "Only consider projects listings and pools that contains at least this amount of credits (Tonnes)",
      minimum: 0,
      examples: ["0"],
    })
  ),
});

export type Querystring = Static<typeof querystring>;

export const schema = {
  summary: "User details",
  description: "Get a user's profile and activity",
  tags: ["Users"],
  querystring,
  params,
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
