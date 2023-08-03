import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { compact, concat, curry, isNil, mapValues, min, omit } from "lodash";
import { filter, pipe, split } from "lodash/fp";
import { FindProjectsQueryVariables } from "../../.generated/types/marketplace.types";
import { extract, notNil } from "../../utils/functional.utils";
import { gqlSdk } from "../../utils/gqlSdk";
import { fetchAllPoolPrices } from "../../utils/helpers/fetchAllPoolPrices";
import {
  composeCarbonmarkProject,
  composeOffsetProject,
  getDefaultQueryArgs,
  getOffsetTokenPrices,
} from "./projects.utils";

import { fetchAllCarbonProjects } from "../../utils/helpers/carbonProjects.utils";
import { isMatchingCmsProject } from "../../utils/helpers/utils";
import { isListingActive } from "../../utils/marketplace.utils";
import { GetProjectResponse } from "./projects.types";

const schema = {
  querystring: {
    type: "object",
    properties: {
      country: {
        type: "string",
      },
      category: {
        type: "string",
      },
      search: {
        type: "string",
      },
      vintage: {
        type: "string",
      },
    },
  },
  response: {
    "2xx": {
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
  ) {
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

      if (isNil(cmsProject)) {
        console.error("No matching CMS Project for this project", project.id);
        return null;
      }

      return composeCarbonmarkProject(project, cmsProject, lowestPrice);
    });

    // ----- Pool Listings ----- //
    const offsetProjects = offsetData.carbonOffsets.map((offset) => {
      const [registry, code] = offset.projectID.split("-");

      const cmsProject = cmsProjects.find(
        curry(isMatchingCmsProject)({ projectId: code, registry })
      );

      if (isNil(cmsProject)) {
        console.error("NO matching CMS Project for this offset", offset.id);
        return null;
      }

      // Find the lowest price
      // @todo change to number[]
      const tokenPrices = getOffsetTokenPrices(offset, poolPrices);
      const lowestPrice = min(tokenPrices);

      return composeOffsetProject(cmsProject, offset, lowestPrice);
    });

    // Check that the project should be displayed
    const validProject = ({ price }: GetProjectResponse) =>
      notNil(price) && parseFloat(price) > 0;

    const filteredProjects = pipe(
      concat,
      compact,
      filter(validProject)
    )(projects, offsetProjects);

    // Send the transformed projects array as a JSON string in the response
    return reply.send(JSON.stringify(filteredProjects));
  };

export default async (fastify: FastifyInstance) => {
  await fastify.route({
    method: "GET",
    url: "/projects",
    schema,
    handler: handler(fastify),
  });
};
