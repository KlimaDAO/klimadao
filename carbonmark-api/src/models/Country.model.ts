import { Static, Type } from "@sinclair/typebox";

export const CountryModel = Type.Object({ id: Type.String() });
export type Country = Static<typeof CountryModel>;
