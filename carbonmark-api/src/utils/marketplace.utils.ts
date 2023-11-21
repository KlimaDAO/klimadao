import { utils } from "ethers";
import { compact } from "lodash/fp";
import {
  GetProjectsQuery,
  Listing,
} from "../.generated/types/marketplace.types";
import { Listing as ListingModel } from "../models/Listing.model";
import { notNil } from "./functional.utils";
import { formatGraphTimestamps } from "./helpers/utils";

export const isListingActive = (listing: Partial<Listing>) =>
  notNil(listing.leftToSell) &&
  !/^0+$/.test(listing.leftToSell) &&
  listing.active != false &&
  listing.deleted != true;

/**
 * Expects project id to be of type <registrar>-<id>-<vintage>
 * @todo add a regular expression test
 */
export const deconstructListingId = (str: string) => {
  const id = str.split("-");
  const key = `${id[0]}-${id[1]}`;
  const vintage = id[2];
  return {
    key,
    vintage,
  };
};

export type GetProjectListing = NonNullable<
  GetProjectsQuery["projects"][number]["listings"]
>[number];

/** Formats a gql.marketplace listing to match Listing.model, and formats integers */

export const formatListing = (listing: GetProjectListing): ListingModel => {
  // ICR (ERC1155) returns integers while ERC20 returns bigints, handle accordingly below
  const normalizeValues = (value: string, decimals: number) => {
    return listing.project.key.startsWith("ICR")
      ? value
      : utils.formatUnits(value, decimals);
  };
  return {
    ...formatGraphTimestamps(listing),

    leftToSell: normalizeValues(listing.leftToSell, 18),
    singleUnitPrice: utils.formatUnits(listing.singleUnitPrice, 6),
    minFillAmount: normalizeValues(listing.minFillAmount, 18),
    totalAmountToSell: normalizeValues(listing.totalAmountToSell, 18),
    expiration: Number(listing.expiration),
    project: {
      ...listing.project,
      category: listing.project.category?.id || "",
      country: listing.project.country?.id || "",
    },
  };
};
export const formatListings = (
  listings: GetProjectListing[]
): ListingModel[] => {
  return compact(listings.map(formatListing));
};
