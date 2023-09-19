import { FastifyInstance, RouteHandler } from "fastify";
import { NetworkParam } from "../../models/NetworkParam.model";
import { gql_sdk } from "../../utils/gqlSdk";
import { getAllCountries } from "../../utils/helpers/utils";
import { schema } from "./get.schema";
type Query = {
  network: NetworkParam;
};

const handler = (
  fastify: FastifyInstance
): RouteHandler<{ Querystring: Query }> =>
  async function (request, reply) {
    let response;
    const sdk = gql_sdk(request.query.network);
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
