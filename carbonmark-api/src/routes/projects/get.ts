// eslint-disable-next-line @typescript-eslint/ban-ts-comment -- just because
// @ts-nocheck
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { compact, mapValues, omit } from "lodash";
import { assign, concat, map, pipe, split, uniq } from "lodash/fp";
import { FindProjectsQueryVariables } from "src/.generated/types/marketplace.types";
import { CarbonOffset } from "src/.generated/types/offsets.types";
import { fetchAllProjects } from "../../sanity/queries";
import { getSanityClient } from "../../sanity/sanity";
import { extract } from "../../utils/functional.utils";
import { gqlSdk } from "../../utils/gqlSdk";
import { fetchAllPoolPrices } from "../../utils/helpers/fetchAllPoolPrices";
import { findProjectWithRegistryIdAndRegistry } from "../../utils/helpers/utils";
import {
  buildOffsetKey,
  buildPoolProject,
  buildProjectKey,
  getDefaultQueryArgs,
  getListingPrices,
  getLowestOffsetTokenPrice,
  getTokenPrices
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

    // Map<VCS-191-2008, Project>
    const projectMap = new Map(
      projectData.projects?.map((project) => [
        buildProjectKey(project),
        project,
      ])
    );

    // Map<VCS-191-2008, CarbonOffset>
    const offsetMap = new Map(
      offsetData.carbonOffsets?.map((offset) => [
        buildOffsetKey(offset),
        offset,
      ])
    );

    //Find the CarbonOffsets that have matching projects in Carbonmark
    const offsetProjectPairs:Array<[CarbonOffset,Project]> = offsetData.carbonOffsets.map((offset) => [
      offset,
      projectMap.get(buildOffsetKey(offset)),
    ]);

    //Extract the prices for each of the offsets
    const offsetPrices = offsetProjectPairs.map(([offset, project]) =>
      getTokenPrices(offset, project, poolPrices)
    );

    //Extract the prices from each of the listings
    const listingPrices = projectData.projects
      .flatMap(extract("listings"))
      .flatMap(getListingPrices);

    // Collect all prices
    const allPrices = pipe(concat,compact,map(Number),uniq)(offsetPrices,listingPrices)

    // Find the lowest price
    const lowestPrice = allPrices.sort().at(0);

     //Extract the lowest prices available for each of the offsets
     const offsetPriceMap = new Map(offsetData.carbonOffsets.map((offset) =>
     [buildOffsetKey(offset),getLowestOffsetTokenPrice(offset,poolPrices)]
     ));

    // Apply the lowest price to each project
    const projects = projectData.projects.map(assign({price:lowestPrice}))

    const offsetProjects = offsetData.carbonOffsets.map(function (offset) {

      const lowestPrice = getLowestOffsetTokenPrice(offset,poolPrices)

      const cmsData = findProjectWithRegistryIdAndRegistry(
        projectsCmsData,
        offset.projectID.split("-")[1],
        offset.projectID.split("-")[0]
      );

      const singleProject = buildPoolProject(cmsData,offset,lowestPrice)

      return singleProject;
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
