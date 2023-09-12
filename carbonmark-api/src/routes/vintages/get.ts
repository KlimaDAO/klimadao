import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Vintage } from "../../models/Vintage.model";
import { getAllVintages } from "../../utils/helpers/utils";
import { schema } from "./get.schema";

const handler = (fastify: FastifyInstance) =>
  async function (_: FastifyRequest, reply: FastifyReply) {
    let response: Vintage[];
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
