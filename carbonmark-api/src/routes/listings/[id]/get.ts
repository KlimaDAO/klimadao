import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { gql_sdk } from "../../../utils/gqlSdk";
import { getListingById } from "../../../utils/helpers/fetchMarketplaceListings";
import { getTokenById } from "../../../utils/helpers/fetchPoolPricesAndStats";
import { formatListing } from "../../../utils/marketplace.utils";
import { Params, Querystring, schema } from "./get.schema";

const handler = (fastify: FastifyInstance) =>
  async function (
    request: FastifyRequest<{
      Params: Params;
      Querystring: Querystring;
    }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const sdk = gql_sdk(request.query.network);

    const listing = (await getListingById(sdk, id)).listing;

    if (!listing) {
      return reply.notFound();
    }

    const symbol = (await getTokenById(sdk, listing.tokenAddress)).symbol;

    const formattedListing = formatListing(listing);

    const response = {
      ...formattedListing,
      symbol,
    };

    return reply
      .header("Content-Type", "application/json; charset=utf-8")
      .send(JSON.stringify(response));
  };

export default async (fastify: FastifyInstance) =>
  await fastify.route({
    method: "GET",
    url: "/listings/:id",
    handler: handler(fastify),
    schema: schema,
  });
