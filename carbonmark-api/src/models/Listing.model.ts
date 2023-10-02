import { Static, Type } from "@sinclair/typebox";
import { Nullable } from "./Utility.model";

const ListingSeller = Type.Object({
  handle: Nullable(Type.String()),
  username: Nullable(Type.String()),
  description: Nullable(Type.String()),
  profileImgUrl: Nullable(Type.String()),
  id: Type.String(),
});

export const ListingModel = Type.Object(
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
    seller: Nullable(ListingSeller),
    expiration: Type.String({
      description: "Unix Timestamp (seconds) when the listing expires.",
    }),
    minFillAmount: Type.String({
      description: "Minimum quantity for purchase transaction to succeed.",
    }),
    project: Type.Object({
      id: Type.String(),
      key: Type.String(),
      vintage: Type.String(),
    }),
  },
  {
    description: "Marketplace listing with per-tonne price and project info.",
  }
);

export type Listing = Static<typeof ListingModel>;
