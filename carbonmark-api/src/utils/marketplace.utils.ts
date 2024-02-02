import { utils } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { compact } from "lodash/fp";
import {
  IS_REGISTRY_ID,
  REGISTRIES,
  RegistryId,
} from "../../src/app.constants";
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

/** Format amounts or quantities by registry decimals */
/** Currently all registries use 18 decimals except ICR, which uses 0  */

export const formatAmountByRegistry = (
  registryId: RegistryId,
  quantity: string
) => {
  const registry = Object.values(REGISTRIES).find((r) => r.id === registryId);

  if (!registry) {
    throw new Error(`Registry with id ${registryId} not found.`);
  }

  return formatUnits(quantity, registry.decimals);
};

/** Formats a gql.marketplace listing to match Listing.model, and formats integers */

export const formatListing = (listing: GetProjectListing): ListingModel => {
  const registry = listing.project.key.split("-")[0];

  if (!IS_REGISTRY_ID(registry)) {
    throw new Error(`Invalid registry id in formatListing: ${registry}`);
  }

  return {
    ...formatGraphTimestamps(listing),

    leftToSell: formatAmountByRegistry(registry, listing.leftToSell),
    singleUnitPrice: utils.formatUnits(listing.singleUnitPrice, 6),
    minFillAmount: formatAmountByRegistry(registry, listing.minFillAmount),
    totalAmountToSell: formatAmountByRegistry(
      registry,
      listing.totalAmountToSell
    ),
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
