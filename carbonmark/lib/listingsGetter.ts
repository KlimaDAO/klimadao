import { safeAdd, safeSub } from "@klimadao/lib/utils";
import { Listing } from "lib/types/carbonmark.types";
import { DEFAULT_MIN_LISTING_QUANTITY } from "./constants";

export const getAmountLeftToSell = (listings: Listing[]): number =>
  Number(listings.reduce((acc, curr) => safeAdd(acc, curr.leftToSell), "0"));

export const getTotalAmountToSell = (listings: Listing[]): number =>
  Number(
    listings.reduce((acc, curr) => safeAdd(acc, curr.totalAmountToSell), "0")
  );

export const getTotalAmountSold = (listings: Listing[]): string => {
  const totalAmount = getTotalAmountToSell(listings);
  const leftToSell = getAmountLeftToSell(listings);
  return safeSub(totalAmount.toString(), leftToSell.toString());
};

export const getActiveListings = (listings: Listing[]) =>
  listings.filter((l) => l.active && l.deleted === false);

export const getNonDustListings = (listings: Listing[]) =>
  listings.filter((l) => Number(l.leftToSell) >= DEFAULT_MIN_LISTING_QUANTITY);

export const getAllListings = (listings: Listing[]) =>
  listings.filter((l) => l.deleted === false);

export const getSortByUpdateListings = (listings: Listing[]) =>
  listings.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
