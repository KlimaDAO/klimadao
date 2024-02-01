import { Static, Type } from "@sinclair/typebox";

export const ProvenanceRecordModel = Type.Object({
  id: Type.String(),
  transactionType: Type.String(),
  registrySerialNumbers: Type.Array(Type.String()),
  token: Type.String(),
  sender: Type.String(),
  receiver: Type.String(),
  originalAmount: Type.Number(),
  remainingAmount: Type.Number(),
  createdAt: Type.Number(),
  updatedAt: Type.Number(),
});

export type ProvenanceRecord = Static<typeof ProvenanceRecordModel>;
