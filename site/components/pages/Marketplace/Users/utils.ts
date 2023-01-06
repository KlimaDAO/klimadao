import { Listing } from "@klimadao/lib/types/marketplace";
import { formatUnits } from "@klimadao/lib/utils";

export const pollUntil = async <T>(params: {
  fn: () => Promise<T>;
  validate: (value: T) => boolean;
  ms: number;
  maxAttempts: number;
}) => {
  let attempts = 0;
  let result = await params.fn();
  attempts++;

  if (params.maxAttempts && attempts === params.maxAttempts) {
    return Promise.reject(new Error("Exceeded max attempts"));
  }

  while (!params.validate(result)) {
    await wait(params.ms);
    result = await params.fn();
  }

  return result;
};

const wait = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

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
