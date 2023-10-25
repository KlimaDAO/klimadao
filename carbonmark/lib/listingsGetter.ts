import { safeAdd, safeSub } from "@klimadao/lib/utils";
import { Listing } from "lib/types/carbonmark.types";

export const getAmountLeftToSell = (listings: Listing[]) =>
  listings.reduce((acc, curr) => {
    return Number(safeAdd(acc.toString(), curr.leftToSell));
  }, 0);

export const getTotalAmountToSell = (listings: Listing[]) =>
  listings.reduce((acc, curr) => {
    return Number(safeAdd(acc.toString(), curr.totalAmountToSell));
  }, 0);

export const getTotalAmountSold = (listings: Listing[]) => {
  const totalAmount = getTotalAmountToSell(listings);
  const leftToSell = getAmountLeftToSell(listings);
  return safeSub(totalAmount.toString(), leftToSell.toString());
};

export const getActiveListings = (listings: Listing[]) =>
  listings.filter((l) => l.active && l.deleted === false);

export const getAllListings = (listings: Listing[]) =>
  listings.filter((l) => l.deleted === false);

export const getSortByUpdateListings = (listings: Listing[]) =>
  listings.sort((a, b) => Number(safeSub(b.updatedAt!, a.updatedAt!)));
