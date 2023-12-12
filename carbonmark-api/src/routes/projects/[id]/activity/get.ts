import { Static } from "@sinclair/typebox";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Activity } from "../../../../models/Activity.model";
import { getActivities } from "../../../../routes/activities/get.utils";
import { asResponse } from "../../../../utils/helpers/utils";
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
    request.query.projectId = [request.params.id];

    // @todo change back to network aware
    // const network = request.query.network ?? "polygon";
    const network = "mumbai";
    return asResponse(
      reply,
      await getActivities(fastify, request.query, network)
    );
  };

export default async (fastify: FastifyInstance) => {
  await fastify.route({
    method: "GET",
    url: "/projects/:id/activity",
    handler: handler(fastify),
    schema,
  });
};
