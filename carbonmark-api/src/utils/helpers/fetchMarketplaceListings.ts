import { FastifyInstance } from "fastify";
import { sortBy } from "lodash";
import { Listing } from "../../models/Listing.model";
import { isActiveListing } from "../../routes/projects/get.utils";
import { GQL_SDK } from "../gqlSdk";
import { GetProjectListing, formatListing } from "../marketplace.utils";
import { getUserProfilesByIds } from "./users.utils";

type ListingsParams = {
  key: string; // Project key `"VCS-981"`
  vintage: string; // Vintage string `"2017"`
  fastify: FastifyInstance; // Fastify instance
  /** UNIX seconds - default is current system timestamp */
  expiresAfter?: string;
};

export const getCreditListings = async (
  sdk: GQL_SDK,
  params: {
    projectId: string;
    vintageStr: string;
    /** UNIX seconds - default is current system timestamp */
    expiresAfter?: string;
  }
) => {
  const expiresAfter =
    params.expiresAfter || String(Math.floor(Date.now() / 1000));
  const project = await sdk.marketplace.getProjectById({
    projectId: params.projectId,
    expiresAfter,
  });
  return project;
};

const formatListings = async (
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

/**
 * Query the subgraph for active marketplace listings and project data for the given project
 * Filters out deleted, sold-out and inactive listings
 * Fetches seller profile info from firebase
 */
export const fetchMarketplaceListings = async (
  sdk: GQL_SDK,
  { key, vintage, expiresAfter, fastify }: ListingsParams
): Promise<[Listing[]]> => {
  const projectId = key + "-" + vintage;
  const { project } = await sdk.marketplace.getProjectById({
    projectId,
    expiresAfter: expiresAfter ?? String(Math.floor(Date.now() / 1000)),
  });
  const filteredListings = project?.listings?.filter(isActiveListing) || [];

  const listingsWithProfiles = await formatListings(filteredListings, fastify);

  return [listingsWithProfiles];
};
