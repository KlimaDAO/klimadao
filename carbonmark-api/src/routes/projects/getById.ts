import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { compact, concat, isNil, min } from "lodash";
import { pipe, uniq } from "lodash/fp";
import { fetchCarbonProject } from "../../utils/helpers/carbonProjects.utils";
import { fetchMarketplaceListings } from "../../utils/helpers/fetchMarketplaceListings";
import { fetchPoolPricesAndStats } from "../../utils/helpers/fetchPoolPricesAndStats";

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

    const [[poolPrices, stats], [listings, activities], cmsData] =
      await Promise.all([
        fetchPoolPricesAndStats({ key, vintage }),
        fetchMarketplaceListings({ key, vintage, fastify }),
        fetchCarbonProject({
          registry,
          registryProjectId,
        }),
      ]);
    if (isNil(cmsData)) {
      // only render pages if project details exist (render even if there are no listings!)
      return reply.notFound();
    }

    const poolPriceValues = poolPrices.map((p) => Number(p.singleUnitPrice));
    const listingPriceValues = compact(listings).map((l) =>
      Number(l.singleUnitPrice)
    );

    // these are already formatted as usd numbers
    const bestPrice = pipe(
      concat,
      uniq,
      min
    )(poolPriceValues, listingPriceValues);

    const projectResponse = {
      ...cmsData,
      stats,
      prices: poolPrices,
      listings,
      activities,
      price: String(bestPrice ?? 0), // remove trailing zeros
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
