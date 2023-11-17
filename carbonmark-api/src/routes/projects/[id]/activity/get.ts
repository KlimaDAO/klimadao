import { Static } from "@sinclair/typebox";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Activity } from "../../../../models/Activity.model";
import { getActivities } from "../../../../routes/activities/get.utils";
import { schema } from "./get.schema";

/**
 * This handler fetches activities for a carbon project
 *
 * @returns
 */
const handler = (fastify: FastifyInstance) =>
  function (
    request: FastifyRequest<{
      Params: Static<typeof schema.params>;
      Querystring: Static<typeof schema.querystring>;
    }>,
    reply: FastifyReply
  ): Promise<Activity[]> {
    request.query.projectId = request.params.id;
    return getActivities(fastify, reply, request.query, request.query.network);
  };

export default async (fastify: FastifyInstance) => {
  await fastify.route({
    method: "GET",
    url: "/projects/:id/activity",
    handler: handler(fastify),
    schema,
  });
};