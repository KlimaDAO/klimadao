import { Static, Type } from "@sinclair/typebox";
import { Nullable } from "./Utility.model";

export const ActivityModel = Type.Object({
  id: Type.String(),
  amount: Nullable(Type.String()),
  previousAmount: Nullable(Type.String()),
  price: Nullable(Type.String()),
  previousPrice: Nullable(Type.String()),
  timeStamp: Nullable(Type.String()),
  activityType: Type.String(),
  seller: Type.Object({
    id: Type.String(),
    handle: Type.Optional(Nullable(Type.String())),
  }),
  buyer: Nullable(
    Type.Object({
      id: Type.String(),
      handle: Type.Optional(Nullable(Type.String())),
    })
  ),
});

export type Activity = Static<typeof ActivityModel>;
