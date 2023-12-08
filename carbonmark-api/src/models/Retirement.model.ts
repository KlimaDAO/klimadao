import { Static, Type } from "@sinclair/typebox";

export const RetirementModel = Type.Object({
  id: Type.Optional(Type.String()),
  bridgeId: Type.Optional(Type.String()),
  amount: Type.Number(),
  beneficiaryAddress: Type.String(),
  beneficiaryName: Type.Optional(Type.String()),
  retirementMessage: Type.Optional(Type.String()),
  retiringAddress: Type.String(),
  retiringName: Type.Optional(Type.String()),
  timestamp: Type.Number(),
});

export type Retirement = Static<typeof RetirementModel>;
