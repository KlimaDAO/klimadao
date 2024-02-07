import { Static, Type } from "@sinclair/typebox";
import { NetworkParamModel } from "../../models/NetworkParam.model";
import { RetirementModel } from "../../models/Retirement.model";

export const querystring = Type.Object({
  network: Type.Optional(Type.Ref(NetworkParamModel)),
  beneficiaryAddress: Type.Optional(
    Type.String({
      description: "Address of the retirement beneficiary",
      examples: ["0x087a7afb6975a2837453be685eb6272576c0bc"],
    })
  ),
  retirementIndex: Type.Optional(
    Type.Number({
      description: "Retirement index",
      examples: ["5"],
    })
  ),
});

export type Querystring = Static<typeof querystring>;

export const schema = {
  summary: "Retirement",
  description:
    "Retrieve an array of retirement filtered by desired query parameters",
  tags: ["Retirements"],
  querystring,
  response: {
    200: {
      description: "List of retirement",
      content: {
        "application/json": {
          schema: Type.Array(RetirementModel),
        },
      },
    },
  },
};
