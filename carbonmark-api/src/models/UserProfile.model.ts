import { Static, Type } from "@sinclair/typebox";
import { Nullable } from "./Utility.model";

//This model matches the document structure in https://console.firebase.google.com/project/klimadao-staging
export const UserProfileModel = Type.Object({
  handle: Nullable(Type.String()),
  username: Type.String(),
  description: Nullable(Type.String()),
  profileImgUrl: Nullable(Type.String()),
  updatedAt: Type.Number(),
  createdAt: Type.Number(),
  address: Type.String(),
});

export type UserProfile = Static<typeof UserProfileModel>;
