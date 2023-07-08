import { utils } from "ethers";
import { assign } from "lodash";
import { Activity } from "src/.generated/types/marketplace.types";

export const formatActivity = (activity: Activity) =>
  assign(activity, {
    amount: activity.amount ? utils.formatUnits(activity.amount, 18) : null,
    previousAmount: activity.previousAmount
      ? utils.formatUnits(activity.previousAmount, 18)
      : null,
    price: activity.price ? utils.formatUnits(activity.price, 6) : null,
    previousPrice: activity.previousPrice
      ? utils.formatUnits(activity.previousPrice, 6)
      : null,
  });
