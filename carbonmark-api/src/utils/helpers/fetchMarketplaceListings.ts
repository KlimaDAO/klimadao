import { utils } from "ethers";
import { FastifyInstance } from "fastify";
import { set, sortBy } from "lodash";
import { ActivityType } from "src/.generated/types/marketplace.types";
import { Activity } from "../../models/Activity.model";
import { Listing } from "../../models/Listing.model";
import { isActiveListing } from "../../routes/projects/get.utils";
import { CreditId } from "../CreditId";
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

type ActivitiesParams = {
  projectId: string[]; // Project Id `"VCS-981-2017"`
  activityType: ActivityType[]; // Activity type
  fastify: FastifyInstance; // Fastify instance
};

const filterUnsoldActivity = (activity: { activityType?: string | null }) =>
  activity.activityType !== "Sold";

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

const mapUserToActivities = async (
  activities: Activity[],
  fastify: FastifyInstance
): Promise<Activity[]> => {
  const formattedActivities = activities.map((activity) => ({
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
  formattedActivities.forEach((activity) => {
    if (activity.seller) {
      userIds.add(activity.seller.id.toLowerCase());
    }
    if (activity.buyer) {
      userIds.add(activity.buyer.id.toLowerCase());
    }
  });
  const addresses = sortBy(Array.from(userIds));

  const profilesMap = await getUserProfilesByIds({
    firebase: fastify.firebase,
    addresses,
  });
  const activitiesWithProfiles = formattedActivities.map((act) => {
    const activityWithHandles = { ...act };
    if (act.seller) {
      const sellerData = profilesMap.get(act.seller.id.toLowerCase());
      if (sellerData) {
        set(activityWithHandles, "seller.handle", sellerData.handle);
      }
    }
    if (act.buyer) {
      const buyerData = profilesMap.get(act.buyer.id.toLowerCase());
      if (buyerData && buyerData.handle) {
        set(activityWithHandles, "buyer.handle", buyerData.handle);
      }
    }
    return activityWithHandles;
  });
  return activitiesWithProfiles;
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
): Promise<[Listing[], Activity[]]> => {
  const { project } = await sdk.marketplace.getProjectById({
    projectId: key + "-" + vintage,
    expiresAfter: expiresAfter ?? String(Math.floor(Date.now() / 1000)),
  });
  const filteredListings = project?.listings?.filter(isActiveListing) || [];
  const filteredActivities =
    project?.activities?.filter(filterUnsoldActivity) || [];

  const activitiesWithProfiles = await mapUserToActivities(
    filteredActivities,
    fastify
  );
  const listingsWithProfiles = await formatListings(filteredListings, fastify);

  return [listingsWithProfiles, activitiesWithProfiles];
};

/**
 * Query the subgraph for activities for the given project
 */
export const fetchProjectActivities = async (
  sdk: GQL_SDK,
  { projectId, activityType, fastify }: ActivitiesParams
): Promise<Activity[]> => {
  let data;
  // FIXME: Is it possible to do that with the same gql query template?
  // I suppose we could generate the gql programmatically but I think we do not want to bypass the templating system
  if (projectId.length) {
    // Activities for a set of projects
    const formattedProjectId = projectId.map((projectId) => {
      const { vintage, projectId: key } = new CreditId(projectId);
      return key + "-" + vintage;
    });
    data = await sdk.marketplace.getActivitiesByProjectId({
      projectId: formattedProjectId,
      activityType,
    });
  } else {
    // Activities accross all projects
    data = await sdk.marketplace.getAllActivities({
      activityType,
    });
  }
  const activitiesWithProfiles = await mapUserToActivities(
    data.activities,
    fastify
  );
  return activitiesWithProfiles;
};
