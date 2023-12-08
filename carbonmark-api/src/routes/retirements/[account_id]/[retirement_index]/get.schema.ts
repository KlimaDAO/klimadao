import { Static, Type } from "@sinclair/typebox";
import { NetworkParamModel } from "../../../../models/NetworkParam.model";
import { RetirementModel } from "../../../../models/Retirement.model";

export const params = Type.Object({
  account_id: Type.String({
    description: "Account ID",
    examples: ["0x087a7afb6975a2837453be685eb6272576c0bc"],
  }),
  retirement_index: Type.Number({
    description: "Retirement index",
    examples: ["5"],
  }),
});

export type Params = Static<typeof params>;

const querystring = Type.Object({
  network: Type.Optional(Type.Ref(NetworkParamModel)),
});

export type Querystring = Static<typeof querystring>;

export const schema = {
  summary: "Retirement",
  description: "Retrieve a klima retirement by account and retirement index",
  tags: ["Retirements"],
  params,
  querystring,
  response: {
    200: {
      description: "Retirement with account and index",
      content: {
        "application/json": {
          schema: Type.Array(RetirementModel),
        },
      },
    },
  },
};
