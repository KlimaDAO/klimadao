import { utils } from "ethers";
import { assign } from "lodash";
import { Activity } from "src/.generated/types/marketplace.types";

/**
 * Formats the given activity object by converting the amount, previousAmount, price, and previousPrice
 * from their raw form into a more readable format using ethers' formatUnits function.
 *
 * @param {Activity} activity - The activity object to be formatted.
 * @returns {Activity} The formatted activity object.
 */
export const formatActivity = (activity: Activity): Activity => {
  const format = (value: string | undefined | null, decimals: number) =>
    value ? utils.formatUnits(value, decimals) : null;
  return assign(activity, {
    amount: format(activity.amount, 18),
    previousAmount: format(activity.previousAmount, 18),
    price: format(activity.price, 6),
    previousPrice: format(activity.previousPrice, 6),
  });
};
