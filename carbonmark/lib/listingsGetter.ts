import { formatUnits } from "@klimadao/lib/utils";
import { getTokenDecimals } from "lib/networkAware/getTokenDecimals";
import {
  Listing,
  ListingWithProject,
  Price,
  PriceFlagged,
  ProjectBuyOption,
} from "lib/types/carbonmark";

export const getAmountLeftToSell = <T extends Listing | ListingWithProject>(
  listings: T[]
) =>
  listings.reduce((acc, curr) => {
    const leftToSellTotal = acc + Number(formatUnits(curr.leftToSell));
    return leftToSellTotal;
  }, 0);

export const getTotalAmountToSell = <T extends Listing | ListingWithProject>(
  listings: T[]
) =>
  listings.reduce((acc, curr) => {
    const totalAmountTo = acc + Number(formatUnits(curr.totalAmountToSell));
    return totalAmountTo;
  }, 0);

export const getTotalAmountSold = <T extends Listing | ListingWithProject>(
  listings: T[]
) => {
  const totalAmount = getTotalAmountToSell(listings);
  const leftToSell = getAmountLeftToSell(listings);
  return totalAmount - leftToSell;
};

export const getActiveListings = <T extends Listing | ListingWithProject>(
  listings: T[]
) => listings.filter((l) => l.active && l.deleted === false);

export const getAllListings = <T extends Listing | ListingWithProject>(
  listings: T[]
) => listings.filter((l) => l.deleted === false);

export const getSortByUpdateListings = <T extends Listing | ListingWithProject>(
  listings: T[]
) => listings.sort((a, b) => Number(b.updatedAt) - Number(a.updatedAt));

export const getLowestPriceFromBuyOptions = (options: ProjectBuyOption[]) => {
  return options[0].singleUnitPrice;
};

export const sortPricesAndListingsByBestPrice = <
  T extends Listing | ListingWithProject
>(
  prices: Price[],
  listings: T[]
): ProjectBuyOption[] => {
  const flaggedPrices = !!prices?.length && flagPrices(prices);
  const formattedListings = !!listings?.length && formatListings(listings);

  // Ugly, but otherwise babel throws !
  const mergedArray = [...(flaggedPrices || []), ...(formattedListings || [])];

  return mergedArray.sort(
    (a, b) => Number(a.singleUnitPrice) - Number(b.singleUnitPrice)
  );
};

export const formatListings = <T extends Listing | ListingWithProject>(
  listings: T[]
) =>
  listings.map((listing) => ({
    ...listing,
    singleUnitPrice: formatUnits(
      listing.singleUnitPrice,
      getTokenDecimals("usdc")
    ),
  }));

export const flagPrices = (prices: Price[]): PriceFlagged[] =>
  prices.map((price) => ({
    ...price,
    isPoolProject: true,
  }));
