import { Static, Type } from "@sinclair/typebox";
import { Nullable } from "../routes/common.schema";
import { Activity } from "./Activity.model";
import { Listing } from "./Listing.model";
import { Methodology } from "./Methodology.model";
import { GeoJSONPoint, Image } from "./Utility.model";

const Price = Type.Object({
  poolName: Type.String(),
  supply: Type.String(),
  poolAddress: Type.String(),
  isPoolDefault: Type.Boolean(),
  projectTokenAddress: Type.String(),
  singleUnitPrice: Type.String(),
});

export const DetailedProject = Type.Object({
  key: Type.String(),
  projectID: Nullable(Type.String()),
  name: Type.String(),
  registry: Type.String(),
  country: Type.String(),
  description: Type.String(),
  location: Nullable(GeoJSONPoint),
  methodologies: Type.Array(Methodology),
  images: Type.Array(Image),
  long_description: Type.String(),
  url: Type.String(),
  stats: Type.Object({
    totalBridged: Type.Number(),
    totalRetired: Type.Number(),
    totalSupply: Type.Number(),
  }),
  prices: Type.Array(Price),
  listings: Type.Array(Listing),
  activities: Type.Array(Activity),
  price: Type.String(),
  isPoolProject: Type.Boolean(),
  vintage: Type.String(),
});

export type DetailedProjectT = Static<typeof DetailedProject>;
