import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { compact, concat, min } from "lodash";
import { pipe, uniq } from "lodash/fp";
import { Activity } from "../../../models/Activity.model";
import { DetailedProject } from "../../../models/DetailedProject.model";
import { Listing } from "../../../models/Listing.model";
import { CreditId } from "../../../utils/CreditId";
import { gql_sdk } from "../../../utils/gqlSdk";
import { fetchCarbonProject } from "../../../utils/helpers/carbonProjects.utils";
import { fetchMarketplaceListings } from "../../../utils/helpers/fetchMarketplaceListings";
import { fetchPoolPricesAndStats } from "../../../utils/helpers/fetchPoolPricesAndStats";
import { Querystring } from "../get.schema";
import { toGeoJSON } from "../get.utils";
import { Params, schema } from "./get.schema";

// Handler function for the "/projects/:id" route
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
    const {
      vintage,
      standard: registry,
      registryProjectId,
      projectId: key,
    } = new CreditId(id);
    let poolPrices, stats, listings, activities, projectDetails;
    try {
      [[poolPrices, stats], [listings, activities], projectDetails] =
        await Promise.all([
          fetchPoolPricesAndStats(sdk, {
            key,
            vintage,
            network: request.query.network || "polygon",
          }),
          fetchMarketplaceListings(sdk, {
            key,
            vintage,
            fastify,
            expiresAfter: request.query.expiresAfter,
          }),
          fetchCarbonProject(sdk, {
            registry,
            registryProjectId,
          }),
        ]);
    } catch (error) {
      console.error(error);
      throw error;
    }

    if (!projectDetails) {
      // only render pages if project details exist (render even if there are no listings!)
      return reply.notFound();
    }

    // TEMP EMERGENCY HOTFIX until we have a mainnet graph url
    // https://github.com/KlimaDAO/klimadao/issues/1604
    if (listings.length && request.query.network !== "mumbai") {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- temp fix
      listings = [] as Listing[];
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- temp fix
      activities = [] as Activity[];
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

    const projectResponse: DetailedProject = {
      country: projectDetails.country,
      description: projectDetails.description,
      key: projectDetails.key,
      registry: projectDetails.registry,
      url: projectDetails.url,
      name: projectDetails.name,
      methodologies: projectDetails.methodologies ?? [],
      short_description: projectDetails.shortDescription,
      long_description: projectDetails.longDescription,
      projectID: projectDetails.registryProjectId,
      location: toGeoJSON(projectDetails.geolocation),
      price: String(bestPrice ?? 0), // remove trailing zeros
      prices: poolPrices,
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
