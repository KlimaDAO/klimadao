import { Type } from "@sinclair/typebox";
import { VALID_ADDRESS_REGEX } from "../../../app.constants";

export const RequestBody = Type.Object(
  {
    username: Type.Optional(Type.String({ minLength: 2 })),
    description: Type.Optional(Type.String({ maxLength: 500 })),
    profileImgUrl: Type.Optional(Type.String()),
  },
  {
    description: "One or more fields to update.",
  }
);

export const ResponseBody = Type.Object({
  address: Type.String({ pattern: VALID_ADDRESS_REGEX.source }),
  nonce: Type.Number(),
});

/** /users/:wallet */
export const Params = Type.Object(
  {
    wallet: Type.String({
      description: "The target wallet address",
      examples: ["0xAb5B7b5849784279280188b556AF3c179F31Dc5B"],
    }),
  },
  { required: ["wallet"] }
);

export const schema = {
  summary: "Update an existing user profile",
  tags: ["Users"],
  body: RequestBody,
  response: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          schema: ResponseBody,
        },
      },
    },
  },
};
