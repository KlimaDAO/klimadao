import { Static, Type } from "@sinclair/typebox";
import { ActivityModel } from "./Activity.model";
import { AssetModel } from "./Asset.model";
import { ListingModel } from "./Listing.model";
import { Nullable } from "./Utility.model";

//This model matches the document structure in https://console.firebase.google.com/project/klimadao-staging
export const UserModel = Type.Object(
  {
    handle: Nullable(Type.String()),
    username: Type.String(),
    description: Nullable(Type.String()),
    profileImgUrl: Nullable(Type.String()),
    updatedAt: Type.Number(),
    createdAt: Type.Number(),
    wallet: Type.String(),
    listings: Type.Array(Type.Ref(ListingModel)),
    activities: Type.Array(Type.Ref(ActivityModel)),
    assets: Type.Array(Type.Ref(AssetModel)),
  },
  {
    $id: "UserModel",
  }
);

export type User = Static<typeof UserModel>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- typeguard
export function isUser(obj: any): obj is User {
  return (
    obj &&
    typeof obj.handle === "string" &&
    typeof obj.username === "string" &&
    typeof obj.description === "string" &&
    (obj.profileImgUrl === null || typeof obj.profileImgUrl === "string") &&
    typeof obj.updatedAt === "number" &&
    typeof obj.createdAt === "number" &&
    typeof obj.wallet === "string" &&
    Array.isArray(obj.listings) &&
    Array.isArray(obj.activities) &&
    Array.isArray(obj.assets)
  );
}
