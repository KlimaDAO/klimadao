import { Static, Type } from "@sinclair/typebox";

export const PurchaseModel = Type.Object({
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

export type Purchase = Static<typeof PurchaseModel>;
