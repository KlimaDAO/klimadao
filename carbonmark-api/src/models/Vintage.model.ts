import { Static, Type } from "@sinclair/typebox";

//This might be a little unnecessary.. :D
export const VintageModel = Type.String({ $id: "VintageModel" });

export type Vintage = Static<typeof VintageModel>;
