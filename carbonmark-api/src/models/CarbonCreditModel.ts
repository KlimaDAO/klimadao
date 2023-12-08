import { Static, Type } from "@sinclair/typebox";

export const CarbonCreditModel = Type.Object({
  id: Type.Optional(Type.String()),
  bridgeProtocol: Type.Optional(Type.String()),
  vintage: Type.Optional(Type.Number()),
  currentSupply: Type.Number(),
  retired: Type.Number(),
  crossChainSupply: Type.Number(),
});

export type CarbonCredit = Static<typeof CarbonCreditModel>;
