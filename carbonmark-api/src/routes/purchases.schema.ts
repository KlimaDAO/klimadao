import { Static, Type } from "@sinclair/typebox";
import { CommonSchemaRefs } from "./common.schema";

const Purchase = Type.Object({
  id: Type.String({
    description: "ID (transaction hash) of the purchase",
    examples: [
      "0xcad9383fba33aaad6256304ef7b103f3f00b21afbaffbbff14423bf074b699e8",
    ],
  }),
  amount: Type.String({
    description: "Stringified 18 decimal BigNumber",
    examples: ["1000000000000000000"],
  }),
  buyer: Type.Object({
    id: Type.String({
      description: "Address of the buyer",
      examples: ["0xAAA699f2098ac92c2f4914979fcb22aba86d259"],
    }),
  }),
  seller: Type.Object({
    id: Type.String({
      description: "Address of the seller",
      examples: ["0xBBB699f2098ac92c2f4914979fcb22aba86d259"],
    }),
  }),
  listing: Type.Object({
    id: Type.String({
      description: "ID of the listing that was purchased",
      examples: ["0x1"],
    }),
    project: Type.Object({
      country: Type.String({
        examples: ["China"],
      }),
      key: Type.String({
        examples: ["VCS-191"],
      }),
      methodology: Type.String({
        examples: ["ACM0002"],
      }),
      name: Type.String({
        examples: ["4×50 MW Dayingjiang- 3 Hydropower Project Phases 1&2"],
      }),
      projectID: Type.String({
        examples: ["191"],
      }),
      vintage: Type.String({
        examples: ["2008"],
      }),
    }),
  }),
  price: Type.String({
    description: "Stringified 6 decimal BigNumber",
    examples: ["1000000"],
  }),
});

type PurchaseResponse = Static<typeof Purchase>;

const params = Type.Object(
  {
    id: Type.String({
      description: "ID (transaction hash) of the purchase to retrieve",
      examples: [
        "0xcad9383fba33aaad6256304ef7b103f3f00b21afbaffbbff14423bf074b699e8",
      ],
    }),
  },
  {
    required: ["id"],
  }
);

type PurchaseParams = Static<typeof params>;

const querystring = Type.Object({
  network: Type.Optional(CommonSchemaRefs.network),
});

const schema = {
  summary: "Purchase details",
  description:
    "Retrieve the details of a purchase by its ID (transaction hash)",
  querystring,
  params,
  response: {
    200: {
      description: "Successful response with listing details",
      content: {
        "application/json": {
          schema: Purchase,
        },
      },
    },
  },
};

export { PurchaseParams, PurchaseResponse, schema };
