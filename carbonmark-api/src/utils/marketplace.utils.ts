import { utils } from "ethers";
import {
  GetProjectsQuery,
  Listing,
} from "../.generated/types/marketplace.types";
import { Listing as ListingModel } from "../models/Listing.model";
import { notNil } from "./functional.utils";

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
  return {
    ...listing,
    leftToSell: utils.formatUnits(listing.leftToSell, 18),
    singleUnitPrice: utils.formatUnits(listing.singleUnitPrice, 6),
    minFillAmount: utils.formatUnits(listing.minFillAmount, 18),
    totalAmountToSell: utils.formatUnits(listing.totalAmountToSell, 18),
    project: {
      ...listing.project,
      category: listing.project.category?.id || "",
      country: listing.project.country?.id || "",
    },
  };
};
