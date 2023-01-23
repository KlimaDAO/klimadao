import { ActivityActionT } from "@klimadao/lib/types/carbonmark";
import { t } from "@lingui/macro";

export const ACTIVITY_ACTIONS: Record<ActivityActionT, string> = {
  CreatedListing: t({
    id: "activity.action.createdListing",
    message: "created listing",
  }),
  DeletedListing: t({
    id: "activity.action.deletedListing",
    message: "deleted listing",
  }),
  Purchase: t({ id: "activity.action.purchase", message: "bought from" }),
  Sold: t({ id: "activity.action.sold", message: "sold to" }),
  UpdatedPrice: t({
    id: "activity.action.updatedPrice",
    message: "updated price",
  }),
  UpdatedQuantity: t({
    id: "activity.action.updatedQuantity",
    message: "updated quantity",
  }),
} as const;
