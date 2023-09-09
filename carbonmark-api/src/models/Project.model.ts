import { Static, Type } from "@sinclair/typebox";
import { Listing } from "./Listing.model";
import { Methodology } from "./Methodology.model";
import { GeoJSONPoint, Nullable } from "./Utility.model";

export const Project = Type.Object({
  description: Nullable(Type.String()),
  short_description: Nullable(Type.String()),
  key: Type.String(),
  projectID: Type.String(),
  name: Type.String(),
  methodologies: Type.Array(Nullable(Methodology)),
  location: Nullable(GeoJSONPoint, {
    description: "A GeoJSON Point feature.",
  }),
  vintage: Type.String(),
  projectAddress: Type.String(),
  registry: Type.String(),
  updatedAt: Type.String(),
  category: Type.Object({ id: Type.String() }),
  country: Type.Object({ id: Type.String() }),
  price: Type.String(),
  listings: Nullable(Type.Array(Listing)), // null when listings are empty
  /** THE FOLLOWING FIELDS ARE TO BE DEPRECATED */
  id: Type.String({ description: "Deprecated in favor of projectAddress" }),
  isPoolProject: Type.Optional(Type.Boolean()),
});

export type ProjectT = Static<typeof Project>;
