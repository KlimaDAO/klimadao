import { Static } from "@sinclair/typebox";
import { FastifyInstance, FastifyReply } from "fastify";
import { mapValues } from "lodash";
import { split } from "lodash/fp";
import { ActivityType } from "../../.generated/types/marketplace.types";
import { Activity } from "../../models/Activity.model";
import { NetworkParam } from "../../models/NetworkParam.model";
import { gql_sdk } from "../../utils/gqlSdk";
import { fetchProjectActivities } from "../../utils/helpers/fetchMarketplaceListings";
import { stringsToActivityTypes } from "../../utils/helpers/utils";
import { getDefaultQueryArgs } from "../projects/get.utils";
import { schema } from "./get.schema";

/**
 * This handler fetches activities for a carbon project
 *
 * @returns
 */
export const getActivities = async (
  fastify: FastifyInstance,
  reply: FastifyReply,
  query: Static<typeof schema.querystring>,
  network?: NetworkParam
): Promise<Activity[]> => {
  const sdk = gql_sdk(network);
  const args = mapValues(query, split(","));
  const allOptions = await getDefaultQueryArgs(sdk, fastify);
  const activityType: ActivityType[] = args.activityType
    ? stringsToActivityTypes(args.activityType)
    : allOptions.activityType;
  const projectId = args.projectId || [];
  const activities = await fetchProjectActivities(sdk, {
    projectId,
    activityType,
    fastify,
  });

  // Send the transformed projects array as a JSON string in the response
  return reply
    .status(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(activities);
};
