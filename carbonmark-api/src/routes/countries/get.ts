import { FastifyInstance, RouteHandler } from "fastify";
import { getAllCountries } from "../../utils/helpers/utils";
import { schema } from "./get.schema";

const handler = (fastify: FastifyInstance): RouteHandler =>
  async function (request, reply) {
    let response;
    try {
      response = await getAllCountries(fastify);
    } catch (error) {
      //Return bad gateway and pass the error
      console.error(error);
      return reply.status(502).send(error?.message);
    }
    return reply.status(200).send(response);
  };

export default async (fastify: FastifyInstance) =>
  await fastify.route({
    method: "GET",
    url: "/countries",
    handler: handler(fastify),
    schema,
  });
