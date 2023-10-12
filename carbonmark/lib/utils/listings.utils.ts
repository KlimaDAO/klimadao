import {
  DEFAULT_MIN_LISTING_QUANTITY,
  LISTABLE_TOKEN_SYMBOL_REGEX,
} from "lib/constants";
import { Asset, Listing } from "lib/types/carbonmark.types";

/** Takes a `days` argument, converts it to seconds and adds it to the current date timestamp
 * @returns {string} timestamp in Unix seconds
 */
export const getExpirationTimestamp = (days: number): string => {
  // 1000ms/s * 60s/m * 60m/hr * 24hr/d * days
  const milliseconds = 1000 * 60 * 60 * 24 * days;
  const expireTimestamp = Date.now() + milliseconds;
  return Math.floor(expireTimestamp / 1000).toString(); // ms to seconds
};

export const isListableToken = (asset: Asset) =>
  !!asset?.token?.symbol &&
  LISTABLE_TOKEN_SYMBOL_REGEX.test(asset.token.symbol);

export const hasListableBalance = (asset: Asset) => {
  return (
    isListableToken(asset) &&
    Number(asset.amount) >= DEFAULT_MIN_LISTING_QUANTITY
  );
};

// Subtract the sum of asset listings from the total asset balance
export const getUnlistedBalance = (asset: Asset, listings: Listing[]) => {
  const assetListings = listings.filter(
    (l) => l.tokenAddress.toLowerCase() === asset.token.id.toLowerCase()
  );
  const sumLeftToSell = assetListings.reduce(
    (acc, curr) => acc + Number(curr.leftToSell),
    0
  );
  return Number(asset.amount) - Number(sumLeftToSell);
};
