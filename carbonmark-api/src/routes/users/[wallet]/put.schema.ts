import { Type } from "@sinclair/typebox";

export const RequestBody = Type.Object({
  wallet: Type.String({ minLength: 3 }),
  username: Type.String({ minLength: 2 }),
  description: Type.String({ minLength: 2, maxLength: 500 }),
  profileImgUrl: Type.Optional(Type.String()),
  handle: Type.Optional(Type.String({ minLength: 3, maxLength: 24 })),
});

export const ResponseBody = Type.Object({
  address: Type.String({ minLength: 26, maxLength: 64 }),
  nonce: Type.Number(),
});

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
  summary: "Update user profile",
  tags: ["Users"],
  params: Params,
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
