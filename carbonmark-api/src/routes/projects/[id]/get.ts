import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { compact, concat, min } from "lodash";
import { mapValues, pipe, trim, uniq } from "lodash/fp";
import { REGISTRIES } from "../../../../src/app.constants";
import { DetailedProject } from "../../../models/DetailedProject.model";
import { CreditId } from "../../../utils/CreditId";
import { gql_sdk } from "../../../utils/gqlSdk";
import {
  fetchCMSProject,
  type FetchCarbonProjectArgs,
  type FetchCarbonProjectMethod,
  type ProjectImage,
} from "../../../utils/helpers/cms.utils";

import { fetchMarketplaceListings } from "../../../utils/helpers/fetchMarketplaceListings";
import { fetchPoolPricesAndStats } from "../../../utils/helpers/fetchPoolPricesAndStats";
import { toGeoJSON } from "../get.utils";
import { ICR_API } from "./../../../../src/utils/ICR/ICR_API_endpoints";
import { Params, Querystring, schema } from "./get.schema";

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
    // const network = request.query.network ?? "polygon";
    // @todo reset once network switching is stable, FO R
    const network = "mumbai";

    const sdk = gql_sdk(network);

    const {
      vintage,
      standard: registry,
      registryProjectId,
      projectId: key,
    } = new CreditId(id);

    let fetchCarbonProjectMethod: FetchCarbonProjectMethod;
    let fetchCarbonProjectArgs: FetchCarbonProjectArgs;
    let icrSerialization: string | undefined;

    switch (registry) {
      case REGISTRIES["ICR"].id: {
        const { ICR_API_URL } = ICR_API(network);
        fetchCarbonProjectMethod = ICR_API_URL;
        fetchCarbonProjectArgs = {
          serialization: id,
          network: network,
        };
        icrSerialization = id;
        break;
      }
      default:
        fetchCarbonProjectMethod = sdk;
        fetchCarbonProjectArgs = {
          registry,
          registryProjectId,
          network: network,
        };
        break;
    }

    let poolPrices, stats, listings, projectDetails;

    try {
      [[poolPrices, stats], [listings], projectDetails] = await Promise.all([
        fetchPoolPricesAndStats(sdk, {
          key,
          vintage,
          network: request.query.network || "polygon",
          icrSerialization,
        }),
        fetchMarketplaceListings(sdk, {
          key,
          vintage,
          fastify,
          expiresAfter: request.query.expiresAfter,
        }),
        fetchCMSProject(fetchCarbonProjectMethod, fetchCarbonProjectArgs),
      ]);
    } catch (error) {
      console.error(error);
      throw error;
    }
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

    const projectResponse: DetailedProject = {
      country: projectDetails.country,
      description: projectDetails.description,
      key: projectDetails.key,
      registry: projectDetails.registry,
      url: projectDetails.url,
      name: projectDetails.name,
      /** Sanitize category values */
      methodologies: projectDetails.methodologies?.map(mapValues(trim)) ?? [],
      short_description: projectDetails.shortDescription,
      long_description: projectDetails.longDescription,
      projectID: projectDetails.registryProjectId,
      location: toGeoJSON(projectDetails.geolocation),
      price: String(bestPrice ?? 0), // remove trailing zeros
      prices: poolPrices,
      images:
        projectDetails?.images
          ?.filter((image): image is ProjectImage => !!image)
          .map((image: ProjectImage) => ({
            caption: image?.asset?.altText || "",
            url: image?.asset?.url || "",
          })) ?? [],
      listings,
      vintage,
      stats,
      serialization: icrSerialization,
      tokenId: projectDetails.tokenId,
    };
    return reply
      .header("Content-Type", "application/json; charset=utf-8")
      .send(JSON.stringify(projectResponse));
  };

export default async (fastify: FastifyInstance) =>
  await fastify.route({
    method: "GET",
    url: "/projects/:id",
    handler: handler(fastify),
    schema,
  });
