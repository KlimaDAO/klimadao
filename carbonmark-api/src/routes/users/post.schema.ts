import { Type } from "@sinclair/typebox";

export const RequestBody = Type.Object(
  {
    handle: Type.String({ minLength: 3 }),
    username: Type.String({ minLength: 2 }),
    description: Type.String({ maxLength: 500 }),
    wallet: Type.String({ minLength: 26, maxLength: 64 }),
    profileImgUrl: Type.String(),
  },
  { required: ["handle", "username", "wallet", "description"] }
);

export const ResponseSchema = Type.Object({
  handle: Type.String(),
  username: Type.String(),
  wallet: Type.String(),
  updatedAt: Type.Number(),
  createdAt: Type.Number(),
});

export const schema = {
  summary: "Create user profile",
  tags: ["Users"],
  body: RequestBody,
  response: {
    200: {
      content: {
        "application/json": {
          schema: ResponseSchema,
        },
      },
    },
    403: {
      content: {
        "application/json": {
          schema: Type.Object({
            error: Type.String(),
            code: Type.Number(),
          }),
        },
      },
    },
  },
};
