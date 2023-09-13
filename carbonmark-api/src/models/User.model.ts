import { Static, Type } from "@sinclair/typebox";
import { ActivityModel } from "./Activity.model";
import { AssetModel } from "./Asset.model";
import { ListingModel } from "./Listing.model";
import { Nullable } from "./Utility.model";

export const UserModel = Type.Object({
  handle: Type.String(),
  username: Type.String(),
  description: Type.String(),
  profileImgUrl: Nullable(Type.String()),
  updatedAt: Type.Number(),
  createdAt: Type.Number(),
  wallet: Type.String(),
  listings: Type.Array(ListingModel),
  activities: Type.Array(ActivityModel),
  //@todo replace unknown with Holding model type
  assets: Type.Array(AssetModel),
});

export type User = Static<typeof UserModel>;
