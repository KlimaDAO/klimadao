import { formatUnits } from "ethers-v6";
import { assign } from "lodash";
import { ByWalletUserActivity } from "src/graphql/marketplace.types";

/**
 * Formats the given activity object by converting the amount, previousAmount, price, and previousPrice
 * from their raw form into a more readable format using ethers' formatUnits function.
 */
export const formatActivity = (
  activity: ByWalletUserActivity
): ByWalletUserActivity => {
  const format = (value: string | undefined | null, decimals: number) =>
    value ? formatUnits(value, decimals) : null;
  return assign(activity, {
    amount: format(activity.amount, 18),
    previousAmount: format(activity.previousAmount, 18),
    price: format(activity.price, 6),
    previousPrice: format(activity.previousPrice, 6),
  });
};
