import { Static, Type } from "@sinclair/typebox";

export const CategoryModel = Type.Object({ id: Type.String() });
export type Category = Static<typeof CategoryModel>;
