// vintage.ts
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getAllVintages } from "../helpers/utils";

export default async function (fastify: FastifyInstance, opts: any) {
  fastify.route({
    method: "GET",
    url: "/vintages",
    schema: {
      response: {
        "2xx": {
          type: "object",
          properties: {
            vintage: { type: "number" },
          },
        },
      },
    },
    handler: async function (_: FastifyRequest, reply: FastifyReply) {
      const vintages = await getAllVintages(fastify);
      return reply.send(JSON.stringify(vintages));
    },
  });
}
