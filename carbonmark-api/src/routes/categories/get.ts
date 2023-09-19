import { FastifyInstance, RouteHandler } from "fastify";
import { NetworkParam } from "src/models/NetworkParam.model";
import { gql_sdk } from "../../utils/gqlSdk";
import { getAllCategories } from "../../utils/helpers/utils";
import { schema } from "./get.schema";

type Query = {
  network: NetworkParam;
};

const handler =
  (fastify: FastifyInstance): RouteHandler<{ Querystring: Query }> =>
  async (request, reply) => {
    const sdk = gql_sdk(request.query.network);
    let response;
    try {
      response = await getAllCategories(sdk, fastify);
    } catch (error) {
      // Return bad gateway and pass the error
      console.error(error);
      return reply.status(502).send(error?.message);
    }

    return reply.status(200).send(response);
  };

export default async (fastify: FastifyInstance) =>
  await fastify.route({
    method: "GET",
    url: "/categories",
    handler: handler(fastify),
    schema,
  });
