import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { compact, concat, min } from "lodash";
import { pipe, uniq } from "lodash/fp";
import { fetchCarbonProject } from "../../utils/helpers/carbonProjects.utils";
import { fetchMarketplaceListings } from "../../utils/helpers/fetchMarketplaceListings";
import { fetchPoolPricesAndStats } from "../../utils/helpers/fetchPoolPricesAndStats";
import { schema } from "./getById.schema";
import { GetProjectByIdResponse } from "./projects.types";
import { toGeoJSON } from "./projects.utils";

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

    const [[poolPrices, stats], [listings, activities], projectDetails] =
      await Promise.all([
        fetchPoolPricesAndStats({ key, vintage }),
        fetchMarketplaceListings({ key, vintage, fastify }),
        fetchCarbonProject({
          registry,
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

    const bestPrice = pipe(
      concat,
      uniq,
      min
    )(poolPriceValues, listingPriceValues);

    const projectResponse: GetProjectByIdResponse = {
      ...projectDetails,
      stats,
      listings,
      activities,
      location: toGeoJSON(projectDetails.geolocation),
      projectID: projectDetails.registryProjectId,
      price: String(bestPrice ?? 0), // remove trailing zeros
      prices: poolPrices,
      isPoolProject: !!poolPrices.length,
      //@todo use sanity Image type
      images:
        projectDetails?.images?.map((image) => ({
          caption: image?.asset?.altText ?? "",
          url: image?.asset?.url ?? "",
        })) ?? [],
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
