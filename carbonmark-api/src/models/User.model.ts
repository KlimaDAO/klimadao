import { Static, Type } from "@sinclair/typebox";
import { Activity } from "./Activity.model";
import { Listing } from "./Listing.model";
import { Nullable } from "./Utility.model";

export const User = Type.Object({
  handle: Type.String(),
  username: Type.String(),
  description: Type.String(),
  profileImgUrl: Nullable(Type.String()),
  updatedAt: Type.Number(),
  createdAt: Type.Number(),
  wallet: Type.String(),
  listings: Type.Array(Listing),
  activities: Type.Array(Activity),
  //@todo replace unknown with Holding model type
  assets: Type.Array(Type.Unknown()),
});

export type UserT = Static<typeof User>;
