import { FastifyInstance } from "fastify";
import { sortBy } from "lodash";
import { Listing } from "../../models/Listing.model";
import { GQL_SDK } from "../gqlSdk";
import { GetProjectListing, formatListing } from "../marketplace.utils";
import { getUserProfilesByIds } from "./users.utils";
import { formatTonnesForSubGraph } from "./utils";

export const getCreditListings = async (
  sdk: GQL_SDK,
  params: {
    projectId: string;
    vintageStr: string;
    /** UNIX seconds - default is current system timestamp */
    expiresAfter?: string;
    minSupply: number;
  }
) => {
  const expiresAfter =
    params.expiresAfter || String(Math.floor(Date.now() / 1000));
  const project = await sdk.marketplace.getProjectById({
    projectId: params.projectId,
    expiresAfter,
    minSupply: formatTonnesForSubGraph(params.minSupply),
  });
  return project;
};

export const addProfilesToListings = async (
  listings: GetProjectListing[],
  fastify: FastifyInstance
): Promise<Listing[]> => {
  const formattedListings = listings.map(formatListing);
  const userIds = new Set<string>();
  formattedListings.forEach((listing) =>
    userIds.add(listing.seller.id.toLowerCase())
  );

  const addresses = sortBy(Array.from(userIds));

  const profilesMap = await getUserProfilesByIds({
    firebase: fastify.firebase,
    addresses,
  });

  const listingsWithProfiles = formattedListings.map((listing) => {
    const sellerData = profilesMap.get(listing.seller.id.toLowerCase());
    return {
      ...listing,
      seller: {
        ...listing.seller,
        ...sellerData,
      },
    };
  });
  return listingsWithProfiles;
};
