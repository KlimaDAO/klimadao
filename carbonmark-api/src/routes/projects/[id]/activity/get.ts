import { Static } from "@sinclair/typebox";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { mapValues } from "lodash";
import { split } from "lodash/fp";
import { ActivityType } from "src/.generated/types/marketplace.types";
import { Activity } from "../../../../models/Activity.model";
import { CreditId } from "../../../../utils/CreditId";
import { gql_sdk } from "../../../../utils/gqlSdk";
import { fetchProjectActivities } from "../../../../utils/helpers/fetchMarketplaceListings";
import { stringsToActivityTypes } from "../../../../utils/helpers/utils";
import { getDefaultQueryArgs } from "../../get.utils";
import { schema } from "./get.schema";

/**
 * This handler fetches activities for a carbon project
 *
 * @returns
 */
const handler = (fastify: FastifyInstance) =>
  async function (
    request: FastifyRequest<{
      Params: Static<typeof schema.params>;
      Querystring: Static<typeof schema.querystring>;
    }>,
    reply: FastifyReply
  ): Promise<Activity[]> {
    const { id } = request.params;
    const sdk = gql_sdk(request.query.network);
    const { vintage, projectId: key } = new CreditId(id);
    const args = mapValues(request.query, split(","));
    const allOptions = await getDefaultQueryArgs(sdk, fastify);
    const activityType: ActivityType[] = args.activityType
      ? stringsToActivityTypes(args.activityType)
      : allOptions.activityType;

    const activities = await fetchProjectActivities(sdk, {
      key,
      vintage,
      fastify,
      activityType,
    });

    // Send the transformed projects array as a JSON string in the response
    return reply
      .status(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send(activities);
  };

export default async (fastify: FastifyInstance) => {
  await fastify.route({
    method: "GET",
    url: "/projects/:id/activity",
    handler: handler(fastify),
    schema,
  });
};
