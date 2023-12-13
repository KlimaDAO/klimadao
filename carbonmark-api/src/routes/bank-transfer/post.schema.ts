import { Static, Type } from "@sinclair/typebox";
import { Nullable } from "../../models/Utility.model";

export const RequestBody = Type.Object(
  {
    project_name: Nullable(Type.String()),
    company_name: Nullable(Type.String({ minLength: 3 })),
    job_title: Nullable(Type.String()),
    email: Nullable(Type.String()),
    first_name: Nullable(Type.String({ minLength: 2 })),
    last_name: Nullable(Type.String({ minLength: 2 })),
    phone_number: Nullable(Type.String()),
    quantity: Nullable(Type.String()),
    beneficiary_name: Nullable(Type.String({ minLength: 2 })),
    beneficiary_address: Nullable(Type.String({ minLength: 2 })),
    retirement_message: Nullable(Type.String({ minLength: 2 })),
  },
  {
    required: [
      "project_name",
      "company_name",
      "email",
      "first_name",
      "last_name",
      "quantity",
    ],
  }
);

export type CreateMailResponse = Static<typeof RequestBody>;

export const schema = {
  summary: "Retire with bank transfer",
  tags: ["Bank-Transfer"],
  body: RequestBody,
  response: {
    200: {
      content: {
        "application/json": {
          schema: RequestBody,
        },
      },
    },
    400: {
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
