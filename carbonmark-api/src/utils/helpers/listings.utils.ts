import { FastifyInstance } from "fastify";
import { sortBy } from "lodash";
import { Listing } from "../../models/Listing.model";
import { GQL_SDK } from "../gqlSdk";
import { formatListing } from "../marketplace.utils";
import { getTokenById } from "./fetchTokens";
import { getUserProfilesByIds } from "./users.utils";

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
  });
  return project;
};

const isActiveListing = (
  l: {
    active?: boolean | null;
    deleted?: boolean | null;
    leftToSell?: string | null;
  },
  minSupply?: number
) =>
  !!l.active &&
  !l.deleted &&
  Number(l.leftToSell) >= (minSupply || 0) &&
  Number(l.leftToSell) > 0;

export const getListingById = async (sdk: GQL_SDK, id: string) => {
  const { listing } = await sdk.marketplace.getListingById({ id });
  if (!listing) {
    return null;
  }

  let symbol;

  if (listing.project.id.startsWith("ICR")) {
    symbol = listing.project.id;
  } else {
    symbol = (await getTokenById(sdk, listing.tokenAddress)).symbol;
  }

  const formattedListing = formatListing(listing);
  return { ...formattedListing, symbol };
};

/**
 * For marketplace subgraph projects
 * Returns true if project has an active listing
 * Note that expired listings are already filtered at gql query level
 * */
export const getActiveListings = (listings?: Listing[], minSupply?: number) => {
  return listings?.filter((l) => isActiveListing(l, minSupply)) || [];
};

export const addProfilesToListings = async (
  formattedListings: Listing[],
  fastify: FastifyInstance
): Promise<Listing[]> => {
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
