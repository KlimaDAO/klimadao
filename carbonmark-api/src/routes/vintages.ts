import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getAllVintages } from "utils/helpers/utils";

const schema = {
  response: {
    "2xx": {
      type: "object",
      properties: {
        vintage: { type: "number" },
      },
    },
  },
};

const handler = (fastify: FastifyInstance) =>
  async function (_: FastifyRequest, reply: FastifyReply) {
    const vintages = await getAllVintages(fastify);
    return reply.send(JSON.stringify(vintages));
  };

export default async (fastify: FastifyInstance) =>
  await fastify.route({
    method: "GET",
    url: "/vintages",
    handler: handler(fastify),
    schema,
  });
