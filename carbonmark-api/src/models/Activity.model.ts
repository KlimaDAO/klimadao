import { Type } from "@sinclair/typebox";
import { Nullable } from "../routes/common.schema";

export const Activity = Type.Object({
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
