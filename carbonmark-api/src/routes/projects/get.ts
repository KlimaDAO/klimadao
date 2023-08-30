import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { compact, concat, curry, mapValues, min, omit } from "lodash";
import { filter, pipe, sortBy, split, uniqBy } from "lodash/fp";
import { FindProjectsQueryVariables } from "../../.generated/types/marketplace.types";
import { extract, notNil } from "../../utils/functional.utils";
import { gqlSdk } from "../../utils/gqlSdk";
import { fetchAllPoolPrices } from "../../utils/helpers/fetchAllPoolPrices";
import { isListingActive } from "../../utils/marketplace.utils";
import { GetProjectResponse } from "./projects.types";
import {
  buildProjectKey,
  composeCarbonmarkProject,
  composeOffsetProject,
  getDefaultQueryArgs,
  getOffsetTokenPrices,
} from "./projects.utils";

import { fetchAllCarbonProjects } from "../../utils/helpers/carbonProjects.utils";
import { isMatchingCmsProject } from "../../utils/helpers/utils";

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

    const [projectData, offsetData, cmsProjects, poolPrices] =
      await Promise.all([
        gqlSdk.marketplace.findProjects(query),
        gqlSdk.offsets.findCarbonOffsets(query),
        fetchAllCarbonProjects(),
        fetchAllPoolPrices(),
      ]);

    // ----- Carbonmark Listings ----- //
    const projects = projectData.projects.map((project) => {
      const cmsProject = cmsProjects.find(
        curry(isMatchingCmsProject)({
          projectId: project.projectID,
          registry: project.registry,
        })
      );

      // Find the lowest price
      // @todo change to number[]
      const listingPrices = compact(project.listings)
        .filter(isListingActive)
        .map(extract("singleUnitPrice"));

      const lowestPrice = min(listingPrices);

      return composeCarbonmarkProject(project, cmsProject, lowestPrice);
    });

    // ----- Pool Listings ----- //
    const offsetProjects = offsetData.carbonOffsets?.map((offset) => {
      const [registry, code] = offset.projectID.split("-");

      const cmsProject = cmsProjects.find(
        curry(isMatchingCmsProject)({ projectId: code, registry })
      );

      // Find the lowest price
      // @todo change to number[]
      const tokenPrices = getOffsetTokenPrices(offset, poolPrices);
      const lowestPrice = min(tokenPrices);

      return composeOffsetProject(offset, cmsProject, lowestPrice);
    });

    const validProject = ({ price }: GetProjectResponse) =>
      notNil(price) && parseFloat(price) > 0;

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
