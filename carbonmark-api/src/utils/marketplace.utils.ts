import { formatUnits } from "ethers-v6";
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

type GetProjectListing = NonNullable<
  GetProjectsQuery["projects"][number]["listings"]
>[number];

/** Formats a gql.marketplace listing to match Listing.model, and formats integers */
export const formatListing = (listing: GetProjectListing): ListingModel => {
  return {
    ...listing,
    leftToSell: formatUnits(listing.leftToSell, 18),
    singleUnitPrice: formatUnits(listing.singleUnitPrice, 6),
    minFillAmount: formatUnits(listing.minFillAmount, 18),
    totalAmountToSell: formatUnits(listing.totalAmountToSell, 18),
    project: {
      ...listing.project,
      category: listing.project.category?.id || "",
      country: listing.project.country?.id || "",
    },
  };
};
