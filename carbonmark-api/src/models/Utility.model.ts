import { SchemaOptions, Static, TSchema, Type } from "@sinclair/typebox";

export const GeoJSONPointModel = Type.Object({
  type: Type.Literal("Feature"),
  geometry: Type.Object({
    type: Type.Literal("Point"),
    coordinates: Type.Array(Type.Number(), { minItems: 2, maxItems: 2 }),
  }),
},
{ $id: "GeoJSONPointModel" }
);

export const Nullable = <T extends TSchema>(type: T, opts?: SchemaOptions) =>
  Type.Optional(Type.Union([type, Type.Null()], opts));

export const ImageModel = Type.Object({
  caption: Nullable(Type.String()),
  url: Nullable(Type.String()),
},
{ $id: "ImageModel" }
);

export type GeoJSONPoint = Static<typeof GeoJSONPointModel>;
export type Image = Static<typeof ImageModel>;
