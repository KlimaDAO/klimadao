import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { NetworkParam } from "src/models/NetworkParam.model";
import { gql_sdk } from "../../../utils/gqlSdk";
import { getListingById } from "../../../utils/helpers/fetchMarketplaceListings";
import { getTokenById } from "../../../utils/helpers/fetchPoolPricesAndStats";

const handler = (fastify: FastifyInstance) =>
  async function (
    request: FastifyRequest<{
      Params: { id: string };
      Querystring: { network: NetworkParam };
    }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const sdk = gql_sdk(request.query.network);

    const listing = (await getListingById(sdk, id)).listing;
    const symbol = (await getTokenById(sdk, listing.tokenAddress)).symbol;

    const token = {
      ...listing,
      symbol,
    };

    return reply
      .header("Content-Type", "application/json; charset=utf-8")
      .send(JSON.stringify(token));
  };

export default async (fastify: FastifyInstance) =>
  await fastify.route({
    method: "GET",
    url: "/listings/:id",
    handler: handler(fastify),
    /* TODO: add schema */
  });
