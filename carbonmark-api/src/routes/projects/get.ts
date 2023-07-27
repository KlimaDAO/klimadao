// eslint-disable-next-line @typescript-eslint/ban-ts-comment -- just because
// @ts-nocheck
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { mapValues, omit } from "lodash";
import { split } from "lodash/fp";
import { fetchAllProjects } from "../../sanity/queries";
import { getSanityClient } from "../../sanity/sanity";
import { FindProjectsQueryVariables } from "../../src/.generated/types/marketplace.types";
import { gqlSdk } from "../../utils/gqlSdk";
import { fetchAllPoolPrices } from "../../utils/helpers/fetchAllPoolPrices";
import { findProjectWithRegistryIdAndRegistry } from "../../utils/helpers/utils";
import {
  composeCarbonmarkProject,
  composeOffsetProject,
  getDefaultQueryArgs,
  getListingPrices,
  getOffsetTokenPrices,
} from "./projects.utils";

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
    const sanity = getSanityClient();

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

    const [projectData, offsetData, projectsCmsData, poolPrices] =
      await Promise.all([
        gqlSdk.marketplace.findProjects(query),
        gqlSdk.offsets.findCarbonOffsets(query),
        sanity.fetch(fetchAllProjects),
        fetchAllPoolPrices(),
      ]);

    // ----- Carbonmark Listings ----- //
    const projects = projectData.projects.map((project) => {
      const cmsProject = findProjectWithRegistryIdAndRegistry(
        projectsCmsData,
        project.projectID,
        project.registry
      );

      // Find the lowest price
      const listingPrices = project.listings?.flatMap(getListingPrices);
      const lowestPrice = listingPrices?.sort().at(0);

      return composeCarbonmarkProject(project, cmsProject, lowestPrice);
    });

    // ----- Pool Listings ----- //
    const offsetProjects = offsetData.carbonOffsets.map((offset) => {
      const cmsProject = findProjectWithRegistryIdAndRegistry(
        projectsCmsData,
        offset.projectID.split("-")[1], //e.g 1120
        offset.projectID.split("-")[0] //e.g VCS
      );

      // Find the lowest price
      const tokenPrices = getOffsetTokenPrices(offset, poolPrices);
      const lowestPrice = tokenPrices.sort().at(0);

      return composeOffsetProject(cmsProject, offset, Number(lowestPrice));
    });

    const filteredProjects = projects
      .concat(offsetProjects)
      .filter((project) => Number(project?.price));

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

// eslint-disable-next-line @typescript-eslint/ban-ts-comment -- just because
// @ts-nocheck
