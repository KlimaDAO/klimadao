import { Static, Type } from "@sinclair/typebox";

export const AssetModel = Type.Object({
  id: Type.String(),
  token: Type.Object({
    id: Type.String(),
    name: Type.String(),
    symbol: Type.String(),
    decimals: Type.Number(),
    tokenId: Type.Optional(Type.String()),
  }),
  amount: Type.String(),
});

export type Asset = Static<typeof AssetModel>;
