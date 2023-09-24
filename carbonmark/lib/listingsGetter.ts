import { formatUnits } from "@klimadao/lib/utils";
import { Listing, TokenPrice } from "lib/types/carbonmark.types";
import { sortBy } from "lodash";

export const getAmountLeftToSell = (listings: Listing[]) =>
  listings.reduce((acc, curr) => {
    const leftToSellTotal = acc + Number(formatUnits(curr.leftToSell));
    return leftToSellTotal;
  }, 0);

export const getTotalAmountToSell = (listings: Listing[]) =>
  listings.reduce((acc, curr) => {
    const totalAmountTo = acc + Number(formatUnits(curr.totalAmountToSell));
    return totalAmountTo;
  }, 0);

export const getTotalAmountSold = (listings: Listing[]) => {
  const totalAmount = getTotalAmountToSell(listings);
  const leftToSell = getAmountLeftToSell(listings);
  return totalAmount - leftToSell;
};

export const getActiveListings = (listings: Listing[]) =>
  listings.filter((l) => l.active && l.deleted === false);

export const getAllListings = (listings: Listing[]) =>
  listings.filter((l) => l.deleted === false);

export const getSortByUpdateListings = (listings: Listing[]) =>
  listings.sort((a, b) => Number(b.updatedAt) - Number(a.updatedAt));

export const sortPricesAndListingsByBestPrice = (
  prices: TokenPrice[],
  listings: Listing[]
) => {
  const flaggedPrices = flagPrices(prices);
  //Convert to Number since singleUnitPrice is a string representation
  const mergedArray = [...flaggedPrices, ...listings];

  return sortBy(mergedArray, (x) => Number(x.singleUnitPrice));
};

const flagPrices = (prices: TokenPrice[]) =>
  prices.map((p) => ({ ...p, isPoolProject: true }));
