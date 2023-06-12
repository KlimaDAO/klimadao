import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { getAllVintages } from "../helpers/utils";

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

const vintages: FastifyPluginAsync = async (fastify): Promise<void> => {
  await fastify.get("/vintages", { schema }, handler(fastify));
};

export default vintages;
