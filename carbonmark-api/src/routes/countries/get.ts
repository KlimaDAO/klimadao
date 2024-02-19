import { Static } from "@sinclair/typebox";
import { FastifyInstance, RouteHandler } from "fastify";
import { gql_sdk } from "../../utils/gqlSdk";
import { getAllCountries } from "../../utils/helpers/utils";
import { Querystring, schema } from "./get.schema";

const handler = (
  fastify: FastifyInstance
): RouteHandler<{ Querystring: Static<typeof Querystring> }> =>
  async function (request, reply) {
    let response;
    const network = request.query.network ?? "polygon";
    const sdk = gql_sdk(network);
    try {
      response = await getAllCountries(sdk, fastify);
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
