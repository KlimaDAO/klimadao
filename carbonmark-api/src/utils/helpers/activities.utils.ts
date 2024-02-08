import { formatUnits } from "ethers-v6";
import { FastifyInstance } from "fastify";
import { set, sortBy } from "lodash";
import { IS_REGISTRY_ID } from "../../../src/app.constants";
import { ActivityType } from "../../.generated/types/marketplace.types";
import { Activity } from "../../models/Activity.model";
import { CreditId } from "../CreditId";
import { GQL_SDK } from "../gqlSdk";
import { formatAmountByRegistry } from "../marketplace.utils";
import { getUserProfilesByIds } from "./users.utils";

type ActivitiesParams = {
  projectId: string[]; // Project Id `"VCS-981-2017"`
  activityType: ActivityType[]; // Activity type
  fastify: FastifyInstance; // Fastify instance
};

const mapUserToActivities = async (
  activities: Activity[],
  fastify: FastifyInstance
): Promise<Activity[]> => {
  const formattedActivities = activities.map((activity) => {
    const registry = activity.project.key.split("-")[0];

    if (!IS_REGISTRY_ID(registry)) {
      throw new Error(
        `Invalid registry id in mapUserToActivities: ${registry}`
      );
    }
    return {
      ...activity,
      price: activity.price ? formatUnits(activity.price, 6) : null,
      previousPrice: activity.previousPrice
        ? formatUnits(activity.previousPrice, 6)
        : null,
      amount: activity.amount
        ? formatAmountByRegistry(registry, activity.amount)
        : null,
      previousAmount: activity.previousAmount
        ? formatAmountByRegistry(registry, activity.previousAmount)
        : null,
    };
  });

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

/**
 * Query the subgraph for project activities
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
