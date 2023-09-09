import { Type } from "@sinclair/typebox";

export const schema = {
  summary: "Get nonce",
  description:
    "Provides the user with a nonce to be included in the next signature. Consumed by /verify endpoint.",
  tags: ["Auth"],
  body: {
    type: "object",
    properties: {
      wallet: Type.String({ minLength: 26, maxLength: 64 }),
    },
    required: ["wallet"],
  },
  response: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: Type.Object({
              nonce: Type.String(),
            }),
          },
        },
      },
    },
  },
};
