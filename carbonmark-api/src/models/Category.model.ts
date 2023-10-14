import { Static, Type } from "@sinclair/typebox";

// @todo uncomment this and fix all the types
// export const CATEGORY_KEYS = Type.Union([
//   Type.Literal("Renewable Energy"),
//   Type.Literal("Forestry"),
//   Type.Literal("Other Nature-Based"),
//   Type.Literal("Other"),
//   Type.Literal("Energy Efficiency"),
//   Type.Literal("Agriculture"),
//   Type.Literal("Industrial Processing"),
//   Type.Literal("Blue Carbon"),
// ]);

export const CategoryModel = Type.Object(
  { id: Type.String() },
  { $id: "CategoryModel" }
);
export type Category = Static<typeof CategoryModel>;
