import { Static, Type } from "@sinclair/typebox";
import { Nullable } from "../routes/common.schema";

export const GeoJSONPoint = Type.Object({
  type: Type.Literal("Feature"),
  geometry: Type.Object({
    type: Type.Literal("Point"),
    coordinates: Type.Array(Type.Number(), { minItems: 2, maxItems: 2 }),
  }),
});

export const Image = Type.Object({
  caption: Nullable(Type.String()),
  url: Nullable(Type.String()),
});

export type GeoJSONPointT = Static<typeof GeoJSONPoint>;
export type ImageT = Static<typeof Image>;
