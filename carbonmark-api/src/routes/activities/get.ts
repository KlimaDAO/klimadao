import { Static } from "@sinclair/typebox";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Activity } from "../../models/Activity.model";
import { asResponse } from "../../utils/helpers/utils";
import { schema } from "./get.schema";
import { getActivities } from "./get.utils";

/**
 * This handler fetches activities accross carbon projects
 *
 * @returns
 */
const handler = (fastify: FastifyInstance) =>
  async function (
    request: FastifyRequest<{
      Querystring: Static<typeof schema.querystring>;
    }>,
    reply: FastifyReply
  ): Promise<Activity[]> {
    const network = request.query.network ?? "polygon";
    return asResponse(
      reply,
      await getActivities(fastify, request.query, network)
    );
  };

export default async (fastify: FastifyInstance) => {
  await fastify.route({
    method: "GET",
    url: "/activities",
    handler: handler(fastify),
    schema,
  });
};
