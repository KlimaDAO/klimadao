import { Listing } from "@klimadao/lib/types/marketplace";
import { formatUnits } from "@klimadao/lib/utils";

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

export const getLowestPriceFromListings = (listings: Listing[]) => {
  const allPrices = listings.map((l) => Number(formatUnits(l.singleUnitPrice)));
  return Math.min(...allPrices);
};
