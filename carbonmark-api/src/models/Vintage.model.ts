import { Static, Type } from "@sinclair/typebox";

//This might be a little unnecessary.. :D
export const Vintage = Type.String();

export type VintageT = Static<typeof Vintage>;
