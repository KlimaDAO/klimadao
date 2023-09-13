import { Static, Type } from "@sinclair/typebox";

export const CATEGORY_KEYS = Type.Union([
  Type.Literal("Renewable Energy"),
  Type.Literal("Forestry"),
  Type.Literal("Other Nature-Based"),
  Type.Literal("Other"),
  Type.Literal("Energy Efficiency"),
  Type.Literal("Agriculture"),
  Type.Literal("Industrial Processing"),
  Type.Literal("Blue Carbon"),
]);

export const CategoryModel = Type.Object({ id: CATEGORY_KEYS });
export type Category = Static<typeof CategoryModel>;
