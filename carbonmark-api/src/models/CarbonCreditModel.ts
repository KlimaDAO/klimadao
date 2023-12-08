import { Static, Type } from "@sinclair/typebox";

export const RetirementModel = Type.Object({
  id: Type.String(),
  bridgeId: Type.String(),
  amount: Type.Number(),
  beneficiaryAddress: Type.String(),
  beneficiaryName: Type.String(),
  retirementMessage: Type.String(),
  retiringAddress: Type.String(),
  retiringName: Type.String(),
  remainingAmount: Type.Number(),
  timestamp: Type.Number(),
});

export type Record = Static<typeof RetirementModel>;
