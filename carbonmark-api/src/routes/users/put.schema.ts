import { Type } from "@sinclair/typebox";

export const RequestBody = Type.Object({
  wallet: Type.String({ minLength: 3 }),
  username: Type.String({ minLength: 2 }),
  description: Type.String({ minLength: 2, maxLength: 500 }),
  profileImgUrl: Type.Optional(Type.String()),
  handle: Type.Optional(Type.String({ minLength: 3, maxLength: 24 })),
});

export const schema = {
  summary: "Update user profile",
  tags: ["Users"],
  body: RequestBody,
  response: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          schema: RequestBody,
        },
      },
    },
  },
};
