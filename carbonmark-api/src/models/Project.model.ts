import { Static, Type } from "@sinclair/typebox";
import { ListingModel } from "./Listing.model";
import { MethodologyModel } from "./Methodology.model";
import { GeoJSONPointModel, Nullable } from "./Utility.model";

export const ProjectModel = Type.Object({
  description: Nullable(Type.String()),
  short_description: Nullable(Type.String()),
  key: Type.String(),
  projectID: Type.String(),
  name: Type.String(),
  methodologies: Type.Array(Nullable(MethodologyModel)),
  location: Nullable(GeoJSONPointModel, {
    description: "A GeoJSON Point feature.",
  }),
  vintage: Type.String(),
  projectAddress: Type.String(),
  registry: Type.String(),
  updatedAt: Type.String(),
  category: Type.Object({ id: Type.String() }),
  country: Type.Object({ id: Type.String() }),
  price: Type.String(),
  listings: Nullable(Type.Array(ListingModel)), // null when listings are empty
  /** THE FOLLOWING FIELDS ARE TO BE DEPRECATED */
  id: Type.String({ description: "Deprecated in favor of projectAddress" }),
  isPoolProject: Type.Optional(Type.Boolean()),
});

export type Project = Static<typeof ProjectModel>;
