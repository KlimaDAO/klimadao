import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { compact } from "lodash";
import { fetchMarketplaceListings } from "../../utils/helpers/fetchMarketplaceListings";
import { fetchPoolPricesAndStats } from "../../utils/helpers/fetchPoolPricesAndStats";
import { fetchProjectDetails } from "../../utils/helpers/fetchProjectDetails";

const schema = {
  querystring: {
    type: "object",
    properties: {
      category: {
        type: "string",
      },
      country: {
        type: "string",
      },
      search: {
        type: "string",
      },
    },
  },
  tags: ["project"],
};

interface Params {
  id: string;
}

export type Nullable<T> = {
  [P in keyof T]: T[P] | null | undefined;
};

//@note this file is a mess and will be replaced by https://github.com/KlimaDAO/klimadao/pull/1232

// Handler function for the "/projects/:id" route
const handler = (fastify: FastifyInstance) =>
  async function (
    request: FastifyRequest<{ Params: Params }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const [registryParam, registryProjectId, vintage] = id.split("-");
    const registry = registryParam.toUpperCase();
    const key = `${registry}-${registryProjectId}`;

    const [[poolPrices, stats], [listings, activities], projectDetails] =
      await Promise.all([
        fetchPoolPricesAndStats({ key, vintage }),
        fetchMarketplaceListings({ key, vintage, fastify }),
        fetchProjectDetails({
          registry: registry.toUpperCase(),
          registryProjectId,
        }),
      ]);
    if (!projectDetails) {
      // only render pages if project details exist (render even if there are no listings!)
      return reply.notFound();
    }

    const poolPriceValues = poolPrices.map((p) => Number(p.singleUnitPrice));
    const listingPriceValues = compact(listings).map((l) =>
      Number(l.singleUnitPrice)
    );

    const bestPrice =
      [
        ...poolPriceValues, // these are already formatted as usd numbers
        ...listingPriceValues,
      ].sort((a, b) => a - b)[0] || 0;

    const projectResponse = {
      ...projectDetails,
      stats,
      prices: poolPrices,
      listings,
      activities,
      price: bestPrice.toString(), // remove trailing zeros
      isPoolProject: !!poolPrices.length,
      vintage,
    };
    return reply.send(JSON.stringify(projectResponse));
  };

export default async (fastify: FastifyInstance) =>
  await fastify.route({
    method: "GET",
    url: "/projects/:id",
    schema,
    handler: handler(fastify),
  });
