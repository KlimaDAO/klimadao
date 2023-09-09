import { FastifyInstance, RouteHandlerMethod } from "fastify";

const handler =
  (fastify: FastifyInstance): RouteHandlerMethod =>
  (_, res) => {
    try {
      const json = fastify.swagger();
      return res.status(200).send(json);
    } catch (error) {
      console.error(error);
      return res.status(502).send(error?.message);
    }
  };

export default async (fastify: FastifyInstance) =>
  await fastify.route({
    method: "GET",
    url: "/openapi.json",
    handler: handler(fastify),
    schema: {
      hide: true, // hide from docs
    },
  });
