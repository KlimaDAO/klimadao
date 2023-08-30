import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { compact, concat, min } from "lodash";
import { pipe, uniq } from "lodash/fp";
import { fetchCarbonProject } from "../../utils/helpers/carbonProjects.utils";
import { fetchMarketplaceListings } from "../../utils/helpers/fetchMarketplaceListings";
import { fetchPoolPricesAndStats } from "../../utils/helpers/fetchPoolPricesAndStats";
import { GetProjectByIdResponse } from "./projects.types";

const schema = {
  summary: "Project details",
  description: "Retrieve a carbon project by its project ID",
  tags: ["Projects"],
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: {
        type: "string",
        description: "Project id & vintage",
        examples: ["VCS-191-2008"],
      },
    },
  },
  response: {
    "2xx": {
      description: "Successful response",
      type: "object",
      properties: {
        key: { type: "string" },
        projectID: { type: "string" },
        name: { type: "string" },
        registry: { type: "string" },
        country: { type: "string" },
        description: { type: "string" },
        location: {
          type: "object",
          properties: {
            type: { type: "string" },
            geometry: {
              type: "object",
              properties: {
                type: { type: "string" },
                coordinates: {
                  type: "array",
                  items: { type: "number" },
                },
              },
            },
          },
        },
        methodologies: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              category: { type: "string" },
              name: { type: "string" },
            },
          },
        },
        long_description: { type: "string" },
        url: { type: "string" },
        stats: {
          type: "object",
          properties: {
            totalBridged: { type: "number" },
            totalRetired: { type: "number" },
            totalSupply: { type: "number" },
          },
        },
        prices: {
          type: "array",
          items: {
            type: "object",
            properties: {
              poolName: { type: "string" },
              supply: { type: "string" },
              poolAddress: { type: "string" },
              isPoolDefault: { type: "boolean" },
              projectTokenAddress: { type: "string" },
              singleUnitPrice: { type: "string" },
            },
          },
        },
        isPoolProject: { type: "boolean" },
        vintage: { type: "string" },
        //@todo add proper types
        listings: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: true,
          },
          nullable: true,
        },
        activities: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: true,
          },
          nullable: true,
        },
      },
      examples: [
        {
          key: "VCS-191",
          projectID: "191",
          name: "4×50 MW Dayingjiang- 3 Hydropower Project Phases 1&2",
          registry: "VCS",
          country: "China",
          description:
            "The Dayingjiang-3 Hydropower Project Phases 1&2 has total installed capacity of 200 MW. ...", // (truncated for brevity)
          location: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [97.716667, 24.470417],
            },
          },
          methodologies: [
            {
              id: "ACM0002",
              category: "Renewable Energy",
              name: "Grid-connected electricity generation from renewable sources",
            },
          ],
          long_description:
            "The Dayingjiang-3 Hydropower Project Phases 1&2 is a renewable energy project ...", // (truncated for brevity)
          url: "https://registry.verra.org/app/projectDetail/VCS/191",
          stats: {
            totalBridged: 609708,
            totalRetired: 223871.6192861833,
            totalSupply: 385835.38071381673,
          },
          /** Lowest price across pools and listings, formatted string e.g. "0.123456" */
          price: "string",
          prices: [
            {
              poolName: "bct",
              supply: "375274.200673137368160064",
              poolAddress: "0x2f800db0fdb5223b3c3f354886d907a671414a7f",
              isPoolDefault: true,
              projectTokenAddress: "0xb139c4cc9d20a3618e9a2268d73eff18c496b991",
              singleUnitPrice: "0.699612",
            },
          ],
          isPoolProject: true,
          vintage: "2008",
        },
      ],
    },
  },
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

    // these are already formatted as usd numbers
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
      price: String(bestPrice ?? 0), // remove trailing zeros
      prices: poolPrices,
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
