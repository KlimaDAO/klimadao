import { Static, Type } from "@sinclair/typebox";
import { Nullable } from "./Utility.model";

// This model matches the document structure in https://console.firebase.google.com/project/klimadao-staging
export const UserProfileModel = Type.Object({
  handle: Nullable(Type.String()),
  username: Type.String(),
  description: Nullable(Type.String()),
  profileImgUrl: Nullable(Type.String()),
  updatedAt: Type.Number(),
  createdAt: Type.Number(),
  address: Type.String(),
  /**
   * Nonce, incremented once per edit, may not be present
   * Ensures the same message hash can never be reused (replay attack)
   * */
  nonce: Type.Optional(Type.Number()),
});

export type UserProfile = Static<typeof UserProfileModel>;
