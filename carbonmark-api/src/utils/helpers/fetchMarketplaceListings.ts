import { utils } from "ethers";
import { FastifyInstance } from "fastify";
import { set, sortBy } from "lodash";
import { Activity } from "src/models/Activity.model";
import { Listing } from "src/models/Listing.model";
import { NetworkParam } from "../../models/NetworkParam.model";
import { isActiveListing } from "../../routes/projects/get.utils";
import { GQL_SDK } from "../gqlSdk";
import { getUserProfilesByIds } from "./users.utils";

type Params = {
  key: string; // Project key `"VCS-981"`
  vintage: string; // Vintage string `"2017"`
  fastify: FastifyInstance; // Fastify instance
  network?: NetworkParam;
};

const filterUnsoldActivity = (activity: { activityType?: string }) =>
  activity.activityType !== "Sold";

export const getCreditListings = async (
  sdk: GQL_SDK,
  params: {
    projectId: string;
    vintageStr: string;
  }
) => {
  const data = await sdk.marketplace.getCreditListings({
    projectId: params.projectId,
    vintageStr: params.vintageStr,
  });
  const project = data?.projects.at(0);
  return project;
};

/**
 * Query the subgraph for active marketplace listings and project data for the given project
 * Filters out deleted, sold-out and inactive listings
 * Fetches seller profile info from firebase
 */
export const fetchMarketplaceListings = async (
  sdk: GQL_SDK,
  { key, vintage, fastify }: Params
): Promise<[Listing[], Activity[]]> => {
  const project = await getCreditListings(sdk, {
    projectId: key,
    vintageStr: vintage,
  });
  const filteredListings = project?.listings?.filter(isActiveListing) || [];
  const filteredActivities =
    project?.activities?.filter(filterUnsoldActivity) || [];

  const formattedListings = filteredListings.map((listing) => ({
    ...listing,
    singleUnitPrice: utils.formatUnits(listing.singleUnitPrice, 6),
    leftToSell: utils.formatUnits(listing.leftToSell, 18),
    totalAmountToSell: utils.formatUnits(listing.totalAmountToSell, 18),
  }));

  const formattedActivities = filteredActivities.map((activity) => ({
    ...activity,
    price: activity.price ? utils.formatUnits(activity.price, 6) : null,
    previousPrice: activity.previousPrice
      ? utils.formatUnits(activity.previousPrice, 6)
      : null,
    amount: activity.amount ? utils.formatUnits(activity.amount, 18) : null,
    previousAmount: activity.previousAmount
      ? utils.formatUnits(activity.previousAmount, 18)
      : null,
  }));

  const userIds = new Set<string>();
  formattedListings.forEach((listing) =>
    userIds.add(listing.seller.id.toLowerCase())
  );
  formattedActivities.forEach((activity) => {
    userIds.add(activity.seller.id.toLowerCase());
    if (activity.buyer) {
      userIds.add(activity.buyer.id.toLowerCase());
    }
  });

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

  const activitiesWithProfiles = formattedActivities.map((act) => {
    const activityWithHandles = { ...act };
    const sellerData = profilesMap.get(act.seller.id.toLowerCase());
    if (sellerData) {
      set(activityWithHandles, "seller.handle", sellerData.handle);
    }
    if (act.buyer) {
      const buyerData = profilesMap.get(act.buyer.id.toLowerCase());
      if (buyerData && buyerData.handle) {
        set(activityWithHandles, "buyer.handle", buyerData.handle);
      }
    }
    return activityWithHandles;
  });

  return [listingsWithProfiles, activitiesWithProfiles];
};
