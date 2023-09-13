import { Static, Type } from "@sinclair/typebox";
import { CategoryModel } from "./Category.model";
import { CountryModel } from "./Country.model";
import { Nullable } from "./Utility.model";

const ListingSeller = Type.Object({
  handle: Type.String(),
  username: Type.String(),
  description: Type.String(),
  profileImgUrl: Nullable(Type.String()),
  id: Type.String(),
});

/** DEPRECATED. This will be altered with v2 */
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
    //@todo remove this and use the /projects endpoint to fetch
    project: Nullable(
      Type.Object({
        id: Type.String(),
        key: Type.String(),
        name: Type.String(),
        category: Nullable(CategoryModel),
        country: Nullable(CountryModel),
        methodology: Type.String(),
        projectAddress: Type.String(),
        projectID: Type.String(),
        registry: Type.String(),
        vintage: Type.String(),
      })
    ),
  },
  {
    description:
      "DEPRECATED. This resource will be altered in the near future.",
  }
);

export type Listing = Static<typeof ListingModel>;
