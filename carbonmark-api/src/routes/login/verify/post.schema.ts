import { Type } from "@sinclair/typebox";

export const schema = {
  summary: "Verify signed data",
  description:
    "Provide a signed hash to receive a JWT token to be consumed by PUT or POST requests.",
  tags: ["Auth"],
  body: Type.Object(
    {
      wallet: Type.String({ minLength: 26, maxLength: 64 }),
      signature: Type.String(),
    },
    { required: ["wallet", "signature"] }
  ),
  response: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          schema: Type.Object({
            token: Type.String(),
          }),
        },
      },
    },
  },
};
