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
  }),
  buyer: Type.Object({
    id: Type.String(),
    handle: Type.String(),
  }),
});
