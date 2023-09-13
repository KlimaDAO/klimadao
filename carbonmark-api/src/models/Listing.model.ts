import { Static, Type } from "@sinclair/typebox";
import { Nullable } from "./Utility.model";

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
    //These attributes were taken from the ListingFragmentType
    totalAmountToSell: Type.String(),
    active: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    deleted: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    batches: Nullable(Type.Array(Type.String())),
    batchPrices: Nullable(Type.Array(Type.String())),
    createdAt: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    updatedAt: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  },
  {
    description:
      "DEPRECATED. This resource will be altered in the near future.",
  }
);

export type ListingT = Static<typeof Listing>;
