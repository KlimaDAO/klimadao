import { Static } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import { MarketplaceActivityType } from "../../.generated/types/marketplace.types";
import { Activity } from "../../models/Activity.model";
import { NetworkParam } from "../../models/NetworkParam.model";
import { gql_sdk } from "../../utils/gqlSdk";
import { fetchProjectActivities } from "../../utils/helpers/activities.utils";
import { stringsToActivityTypes } from "../../utils/helpers/utils";
import { schema } from "./get.schema";

/**
 * This handler fetches activities for a carbon project
 *
 * @returns
 */
export const getActivities = (
  fastify: FastifyInstance,
  query: Static<typeof schema.querystring>,
  network?: NetworkParam
): Promise<Activity[]> => {
  const sdk = gql_sdk(network);
  const activityType = stringsToActivityTypes(
    query.activityType || Object.keys(MarketplaceActivityType)
  );
  const projectId = query.projectId || [];
  return fetchProjectActivities(sdk, {
    projectId,
    activityType,
    fastify,
  });
};
