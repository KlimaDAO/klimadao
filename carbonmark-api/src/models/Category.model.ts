import { Static, Type } from "@sinclair/typebox";

export const Category = Type.Object({ id: Type.String() });
export type CategoryT = Static<typeof Category>;
