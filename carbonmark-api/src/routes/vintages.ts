import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getAllVintages } from "src/utils/helpers/utils";

const schema = {
  response: {
    "2xx": {
      type: "array",
      items: {
        type: "string",
      },
    },
  },
};

const handler = (fastify: FastifyInstance) =>
  async function (_: FastifyRequest, reply: FastifyReply) {
    let response;
    try {
      response = await getAllVintages(fastify);
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
    url: "/vintages",
    handler: handler(fastify),
    schema,
  });
