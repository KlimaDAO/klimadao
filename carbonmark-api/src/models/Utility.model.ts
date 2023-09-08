import { Type } from "@sinclair/typebox";

export const GeoJSONPoint = Type.Object({
  type: Type.Literal("Feature"),
  geometry: Type.Object({
    type: Type.Literal("Point"),
    coordinates: Type.Array(Type.Number(), { minItems: 2, maxItems: 2 }),
  }),
});

export const Image = Type.Object({
  caption: Type.Optional(Type.String()),
  url: Type.Optional(Type.String()),
});
