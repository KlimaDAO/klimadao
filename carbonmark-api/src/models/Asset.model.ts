import { Static, Type } from "@sinclair/typebox";

export const AssetModel = Type.Object({
  id: Type.String(),
  token: Type.Object({
    id: Type.String(),
    name: Type.String(),
    symbol: Type.String({ pattern: "^(BCT|NBO|UBO|NCT|TCO2-.*|C3T-.*)$" }),
    decimals: Type.Number(),
  }),
  amount: Type.String(),
});

export type Asset = Static<typeof AssetModel>;
