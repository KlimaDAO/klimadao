import { Type } from "@sinclair/typebox";
import { Nullable } from "../../models/Utility.model";

export const RequestBody = Type.Object(
  {
    handle: Type.String({ minLength: 3, maxLength: 24 }),
    username: Type.String({ minLength: 2 }),
    wallet: Type.String({ minLength: 26, maxLength: 64 }),
    description: Nullable(Type.String({ maxLength: 500 })),
    profileImgUrl: Nullable(Type.String()),
  },
  { required: ["handle", "username", "wallet", "description"] }
);

export const ResponseBody = Type.Object({
  address: Type.String({ minLength: 26, maxLength: 64 }),
  nonce: Type.Number(),
});

export const schema = {
  summary: "Create user profile",
  tags: ["Users"],
  body: RequestBody,
  response: {
    200: {
      content: {
        "application/json": {
          schema: ResponseBody,
        },
      },
    },
    403: {
      content: {
        "application/json": {
          schema: Type.Object({
            error: Type.String(),
          }),
        },
      },
    },
  },
};
