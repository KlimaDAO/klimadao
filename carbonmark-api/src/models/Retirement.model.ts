import { Static, Type } from "@sinclair/typebox";
import { CarbonCreditModel } from "./CarbonCredit.model";
import { UserProfileModel } from "./UserProfile.model";

export const RetirementModel = Type.Object({
  id: Type.Optional(Type.String()),
  bridgeId: Type.Optional(Type.String()),
  amount: Type.Number(),
  hash: Type.String(),
  hasProvenanceDetails: Type.Boolean(),
  beneficiaryAddress: Type.String(),
  beneficiaryName: Type.Optional(Type.String()),
  retirementMessage: Type.Optional(Type.String()),
  retiringAddress: Type.String(),
  retiringName: Type.Optional(Type.String()),
  retireeProfile: Type.Optional(UserProfileModel),
  timestamp: Type.Number(),
  credit: Type.Optional(CarbonCreditModel),
});

export type Retirement = Static<typeof RetirementModel>;
