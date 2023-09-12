import { Static } from "@sinclair/typebox";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { compact, concat, min } from "lodash";
import { pipe, uniq } from "lodash/fp";
import { DetailedProjectT } from "../../../models/DetailedProject.model";
import { CreditId } from "../../../utils/CreditId";
import { fetchCarbonProject } from "../../../utils/helpers/carbonProjects.utils";
import { fetchMarketplaceListings } from "../../../utils/helpers/fetchMarketplaceListings";
import { fetchPoolPricesAndStats } from "../../../utils/helpers/fetchPoolPricesAndStats";
import { toGeoJSON } from "../get.utils";
import { Params, schema } from "./get.schema";

// Handler function for the "/projects/:id" route
const handler = (fastify: FastifyInstance) =>
  async function (
    request: FastifyRequest<{ Params: Static<typeof Params> }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const {
      vintage,
      standard: registry,
      registryProjectId,
      projectId: key,
    } = new CreditId(id);

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

    const projectResponse: DetailedProjectT = {
      country: projectDetails.country,
      description: projectDetails.description,
      key: projectDetails.key,
      registry: projectDetails.registry,
      url: projectDetails.url,
      name: projectDetails.name,
      methodologies: projectDetails.methodologies ?? [],
      long_description: projectDetails.longDescription,
      projectID: projectDetails.registryProjectId,
      location: toGeoJSON(projectDetails.geolocation),
      price: String(bestPrice ?? 0), // remove trailing zeros
      prices: poolPrices,
      isPoolProject: !!poolPrices.length,
      images:
        projectDetails?.images?.map((image) => ({
          caption: image?.asset?.altText,
          url: image?.asset?.url,
        })) ?? [],
      activities,
      listings,
      vintage,
      stats,
    };
    return reply.send(JSON.stringify(projectResponse));
  };

export default async (fastify: FastifyInstance) =>
  await fastify.route({
    method: "GET",
    url: "/projects/:id",
    handler: handler(fastify),
    schema,
  });
