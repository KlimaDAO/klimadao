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

export const isListableToken = (asset: Asset): boolean =>
  !!asset?.token?.symbol &&
  LISTABLE_TOKEN_SYMBOL_REGEX.test(asset.token.symbol);

/** Returns the remaining leftToSell for all listings of the given asset */
export const getListedBalance = (asset: Asset, listings: Listing[]): number => {
  const assetListings = listings.filter(
    (l) => l.tokenAddress.toLowerCase() === asset.token.id.toLowerCase()
  );
  return assetListings.reduce((sum, l) => sum + Number(l.leftToSell), 0);
};

/** Subtract the listed balance from the total asset balance to get remaining unlisted tonnes */
export const getUnlistedBalance = (
  asset: Asset,
  listings: Listing[]
): number => {
  const listedBalance = getListedBalance(asset, listings);
  return Number(asset.amount) - listedBalance;
};

/** Returns true if listable asset, with a balance >= minimum listing quantity */
export const hasListableBalance = (
  asset: Asset,
  listings: Listing[]
): boolean => {
  if (!isListableToken(asset)) {
    return false;
  }
  const balance = getUnlistedBalance(asset, listings);
  return balance >= DEFAULT_MIN_LISTING_QUANTITY;
};

/** Returns true if any asset has a listable balance */
export const hasListableAssets = (assets: Asset[], listings: Listing[]) => {
  return assets.some((t) => hasListableBalance(t, listings));
};
