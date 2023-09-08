import { Type } from "@sinclair/typebox";

/** DEPRECATED. This will be altered with v2 */
export const Listing = Type.Object(
  {
    id: Type.String({
      description: "Unique listing identifier",
    }),
    leftToSell: Type.String({
      description: "Remaining supply. Unformatted 18 decimal string",
    }),
    tokenAddress: Type.String({
      description: "Address of the asset being sold",
    }),
    singleUnitPrice: Type.String({
      description:
        "USDC price per tonne. Unformatted 6 decimal string. e.g. 1000000",
    }),
  },
  {
    description:
      "DEPRECATED. This resource will be altered in the near future.",
  }
);
