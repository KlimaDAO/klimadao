import { Static, Type } from "@sinclair/typebox";

export const Country = Type.Object({ id: Type.String() });
export type CountryT = Static<typeof Country>;
