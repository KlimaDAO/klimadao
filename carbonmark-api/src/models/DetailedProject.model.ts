import { Static, Type } from "@sinclair/typebox";
import { Activity } from "./Activity.model";
import { Listing } from "./Listing.model";
import { Methodology } from "./Methodology.model";
import { TokenPrice } from "./TokenPrice.model";
import { GeoJSONPoint, Image, Nullable } from "./Utility.model";

export const DetailedProject = Type.Object({
  key: Type.String(),
  projectID: Nullable(Type.String()),
  name: Nullable(Type.String()),
  registry: Nullable(Type.String()),
  country: Nullable(Type.String()),
  description: Nullable(Type.String()),
  location: Nullable(GeoJSONPoint),
  methodologies: Nullable(Type.Array(Nullable(Methodology))),
  images: Type.Array(Image),
  long_description: Nullable(Type.String()),
  url: Nullable(Type.String()),
  stats: Type.Object({
    totalBridged: Type.Number(),
    totalRetired: Type.Number(),
    totalSupply: Type.Number(),
  }),
  prices: Type.Array(TokenPrice),
  listings: Type.Array(Listing),
  activities: Type.Array(Activity),
  price: Type.String(),
  isPoolProject: Type.Boolean(),
  vintage: Type.String(),
});

export type DetailedProjectT = Static<typeof DetailedProject>;
