import { Static, Type } from "@sinclair/typebox";
import { ListingModel } from "./Listing.model";
import { MethodologyModel } from "./Methodology.model";
import { TokenPriceModel } from "./TokenPrice.model";
import { GeoJSONPointModel, Nullable } from "./Utility.model";

export const ProjectModel = Type.Object({
  description: Nullable(Type.String()),
  long_description: Nullable(Type.String()),
  short_description: Nullable(Type.String()),
  key: Type.String(),
  projectID: Type.String(),
  name: Type.String(),
  methodologies: Type.Array(MethodologyModel),
  location: Nullable(GeoJSONPointModel, {
    description: "A GeoJSON Point feature.",
  }),
  url: Nullable(Type.String()),
  vintage: Type.String(),
  creditTokenAddress: Type.String({
    description: "⚠️Deprecated. Project may have multiple token addresses.",
  }),
  registry: Type.String(),
  updatedAt: Type.String(),
  country: Type.String(),
  region: Type.String(),
  price: Type.String(),
  prices: Type.Array(TokenPriceModel),
  stats: Type.Object({
    totalBridged: Type.Number(),
    totalRetired: Type.Number(),
    totalSupply: Type.Number(),
  }),
  listings: Nullable(Type.Array(ListingModel)), // null when listings are empty
  images: Type.Optional(
    Type.Array(
      Type.Object({
        url: Type.String(),
        caption: Type.String(),
      })
    )
  ),
  hasSupply: Type.Boolean(),
  tokenId: Type.Optional(Type.String()),
  serialization: Type.Optional(Type.String()),
});

export type Project = Static<typeof ProjectModel>;
