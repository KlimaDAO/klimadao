import { Static, Type } from "@sinclair/typebox";
import { FastifySchema } from "fastify";

const Purchase = Type.Object({
  id: Type.String({
    description: "ID (transaction hash) of the purchase",
    examples: [
      "0xcad9383fba33aaad6256304ef7b103f3f00b21afbaffbbff14423bf074b699e8",
    ],
  }),
  amount: Type.String({
    description: "Stringified 18 decimal BigNumber",
  }),
  listing: Type.Object({
    project: Type.Object({
      country: Type.String(),
      key: Type.String({
        examples: ["VCS-191"],
      }),
      methodology: Type.String(),
      name: Type.String(),
      projectID: Type.String({
        examples: ["191"],
      }),
      vintage: Type.String(),
    }),
  }),
  price: Type.String({
    description: "Stringified 6 decimal BigNumber",
  }),
});

type PurchaseResponse = Static<typeof Purchase>;

const Params = Type.Object({
  id: Type.String({
    description: "ID (transaction hash) of the purchase to retrieve",
    examples: [
      "0xcad9383fba33aaad6256304ef7b103f3f00b21afbaffbbff14423bf074b699e8",
    ],
  }),
});

type PurchaseParams = Static<typeof Params>;

const exampleReturn: PurchaseResponse = {
  id: "0xcad9383fba33aaad6256304ef7b103f3f00b21afbaffbbff14423bf074b699e8",
  amount: "1000000000000000000",
  listing: {
    project: {
      country: "China",
      key: "VCS-191",
      methodology: "ACM0002",
      name: "4×50 MW Dayingjiang- 3 Hydropower Project Phases 1&2",
      projectID: "191",
      vintage: "2008",
    },
  },
  price: "230000",
};

const schema: FastifySchema = {
  summary: "Purchase details",
  description:
    "Retrieve the details of a purchase by its ID (transaction hash)",
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: {
        type: "string",
        description: "ID (transaction hash) of the purchase to retrieve",
        examples: [
          "0xcad9383fba33aaad6256304ef7b103f3f00b21afbaffbbff14423bf074b699e8",
        ],
      },
    },
  },
  response: {
    "2xx": {
      description: "Successful response with listing details",
      content: {
        "application/json": {
          schema: Purchase,
        },
      },
      examples: [exampleReturn],
    },
  },
};

export { PurchaseParams, PurchaseResponse, schema };
