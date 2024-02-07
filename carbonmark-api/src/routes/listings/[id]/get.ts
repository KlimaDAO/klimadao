import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { gql_sdk } from "../../../utils/gqlSdk";
import { getListingById } from "../../../utils/helpers/listings.utils";
import { Params, Querystring, schema } from "./get.schema";

const handler = () =>
  async function (
    request: FastifyRequest<{
      Params: Params;
      Querystring: Querystring;
    }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const sdk = gql_sdk(request.query.network);

    const listing = await getListingById(sdk, id);

    if (!listing) {
      return reply.notFound();
    }

    return reply
      .header("Content-Type", "application/json; charset=utf-8")
      .send(JSON.stringify(listing));
  };

export default async (fastify: FastifyInstance) =>
  await fastify.route({
    method: "GET",
    url: "/listings/:id",
    handler: handler(),
    schema: schema,
  });
