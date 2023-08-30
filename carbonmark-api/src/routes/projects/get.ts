import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { compact, concat, mapValues, omit } from "lodash";
import { filter, pipe, sortBy, split, uniqBy } from "lodash/fp";
import {
  FindProjectsQuery,
  FindProjectsQueryVariables,
} from "../../.generated/types/marketplace.types";
import { gqlSdk } from "../../utils/gqlSdk";
import {
  PoolPrice,
  fetchAllPoolPrices,
} from "../../utils/helpers/fetchAllPoolPrices";
import { buildProjectKey, getDefaultQueryArgs } from "./projects.utils";

import { FindCarbonOffsetsQuery } from "src/.generated/types/offsets.types";
import {
  CarbonProject,
  fetchAllCarbonProjects,
} from "../../utils/helpers/carbonProjects.utils";
import {
  marketplaceProjectToCarbonmarkProject,
  offsetProjectToCarbonmarkProject,
  validProject,
} from "./get.utils";
import { GetProjectResponse } from "./projects.types";

const schema = {
  summary: "List projects",
  description:
    "Retrieve an array of carbon projects filtered by desired query parameters",
  tags: ["Projects"],
  querystring: {
    type: "object",
    properties: {
      country: {
        type: "string",
        description: "Desired country of origin for carbon projects",
      },
      category: {
        type: "string",
        description: "Desired category of carbon projects",
      },
      search: {
        type: "string",
        description:
          "Search carbon project names and descriptions for a string of text",
      },
      vintage: {
        type: "string",
        description: "Desired vintage of carbon projects",
      },
    },
  },
  response: {
    "2xx": {
      description: "Successful response",
      type: "object",
      properties: {
        id: { type: "string" },
        key: { type: "string" },
        projectID: { type: "string" },
        name: { type: "string" },
        methodology: { type: "string" },
        vintage: { type: "string" },
        projectAddress: { type: "string" },
        registry: { type: "string" },
        country: { type: "string" },
        category: { type: "string" },
        price: { type: "string" },
      },
    },
  },
};

type Params = {
  country?: string;
  category?: string;
  search?: string;
  vintage?: string;
};

/**
 * This handler fetches data from multiple sources and builds a resulting list of Projects (& PoolProjects)
 * It does so by:
 * 1. Fetch Projects, CarbonOffsets, data from the CMS and token pricing
 * 2. Find the lowest price listed for each Project and CarbonOffset
 * 3. Assign the lowest price to each project
 * 4. Convert each CarbonOffset to a new PoolProject
 * 5. Return the combined collection of Projects & PoolProjects
 *
 * @param fastify
 * @returns
 */
const handler = (fastify: FastifyInstance) =>
  async function (
    request: FastifyRequest<{ Querystring: Params }>,
    reply: FastifyReply
  ): Promise<GetProjectResponse[]> {
    let projectData: FindProjectsQuery,
      offsetData: FindCarbonOffsetsQuery,
      cmsProjects: CarbonProject[],
      poolPrices: Record<string, PoolPrice>;

    //Transform the list params (category, country etc) provided so as to be an array of strings
    const args = mapValues(omit(request.query, "search"), split(","));
    //Get the default args to return all results unless specified
    const defaultArgs = await getDefaultQueryArgs(fastify);

    //Build our query overriding default values
    const query: FindProjectsQueryVariables = {
      ...defaultArgs,
      ...args,
      search: request.query.search ?? "",
    };

    try {
      [projectData, offsetData, cmsProjects, poolPrices] = await Promise.all([
        gqlSdk.marketplace.findProjects(query),
        gqlSdk.offsets.findCarbonOffsets(query),
        fetchAllCarbonProjects(),
        fetchAllPoolPrices(),
      ]);
    } catch (error) {
      console.error(error);
      return reply.status(502).send(error?.message);
    }

    // ----- Carbonmark Listings ----- //
    const projects = projectData.projects.map((project) =>
      marketplaceProjectToCarbonmarkProject(project, cmsProjects)
    );

    // ----- Pool Listings ----- //
    const offsetProjects = offsetData.carbonOffsets?.map((offset) =>
      offsetProjectToCarbonmarkProject(offset, cmsProjects, poolPrices)
    );

    // Remove invalid projects and duplicates selecting the project with the lowest price
    const filteredUniqueProjects: GetProjectResponse[] = pipe(
      concat,
      compact,
      filter(validProject),
      sortBy("price"),
      uniqBy(buildProjectKey)
    )(projects, offsetProjects);

    // Send the transformed projects array as a JSON string in the response
    return reply.send(JSON.stringify(filteredUniqueProjects));
  };

export default async (fastify: FastifyInstance) => {
  await fastify.route({
    method: "GET",
    url: "/projects",
    schema,
    handler: handler(fastify),
  });
};
