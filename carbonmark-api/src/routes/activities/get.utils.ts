import { Static } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import { mapValues } from "lodash";
import { split } from "lodash/fp";
import { ActivityType } from "../../.generated/types/marketplace.types";
import { Activity } from "../../models/Activity.model";
import { NetworkParam } from "../../models/NetworkParam.model";
import { gql_sdk } from "../../utils/gqlSdk";
import { fetchProjectActivities } from "../../utils/helpers/fetchMarketplaceListings";
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
  const args = mapValues(query, split(","));
  const activityType: ActivityType[] = args.activityType
    ? stringsToActivityTypes(args.activityType)
    : Object.values(ActivityType);
  const projectId = args.projectId || [];
  return fetchProjectActivities(sdk, {
    projectId,
    activityType,
    fastify,
  });
};
