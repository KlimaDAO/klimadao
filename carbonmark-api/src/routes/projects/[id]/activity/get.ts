import { Static } from "@sinclair/typebox";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Activity } from "../../../../models/Activity.model";
import { CreditId } from "../../../../utils/CreditId";
import { gql_sdk } from "../../../../utils/gqlSdk";
import { fetchProjectActivities } from "../../../../utils/helpers/fetchMarketplaceListings";
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

    const activities = await fetchProjectActivities(sdk, {
      key,
      vintage,
      fastify,
    });
    console.debug(activities);

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
