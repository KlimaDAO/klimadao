import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Vintage } from "../../models/Vintage.model";
import { gql_sdk } from "../../utils/gqlSdk";
import { getAllVintages } from "../../utils/helpers/utils";
import { Querystring, schema } from "./get.schema";

const handler = (fastify: FastifyInstance) =>
  async function (
    request: FastifyRequest<{ Querystring: Querystring }>,
    reply: FastifyReply
  ) {
    let response: Vintage[];
    const network = request.query.network ?? "polygon";
    const sdk = gql_sdk(network);
    try {
      response = await getAllVintages(sdk, fastify, network);
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
