// eslint-disable-next-line @typescript-eslint/ban-ts-comment -- just because
// @ts-nocheck
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { mapValues, omit } from "lodash";
import { split } from "lodash/fp";
import { FindProjectsQueryVariables } from "src/.generated/types/marketplace.types";
import { fetchAllProjects } from "../../sanity/queries";
import { getSanityClient } from "../../sanity/sanity";
import { extract, notEmpty } from "../../utils/functional.utils";
import { gqlSdk } from "../../utils/gqlSdk";
import { fetchAllPoolPrices } from "../../utils/helpers/fetchAllPoolPrices";
import { findProjectWithRegistryIdAndRegistry } from "../../utils/helpers/utils";
import { POOL_INFO } from "./projects.constants";
import {
  buildOffsetKey,
  buildProjectKey,
  getDefaultQueryArgs,
  getListingPrices,
  getTokenPrices,
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

    // The token prices relevant to the returned offsets and projects
    const uniquePrices: string[] = [];

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
    const offsetProjectPairs = offsetData.carbonOffsets.map((offset) => [
      offset,
      projectMap.get(buildOffsetKey(offset)),
    ]);

    //Extract the prices for each of the offsets
    const offsetPrices = offsetProjectPairs.map(([offset, project]) =>
      getTokenPrices(offset, project, poolPrices)
    );

    const listingPrices = projectData.projects
      .flatMap(extract("listings"))
      .flatMap(getListingPrices);

    uniquePrices.push(...offsetPrices);
    uniquePrices.push(...listingPrices);

    const projects = projectData.projects.map(function (project) {
      let listingPrice = "0";
      if (notEmpty(project.listings)) {
        listingPrice = uniquePrices?.reduce((a, b) =>
          a.length < b.length ? a : a.length === b.length && a < b ? a : b
        );
      }
      const cmsData = findProjectWithRegistryIdAndRegistry(
        projectsCmsData,
        project.projectID,
        project.registry
      );
      project.description = cmsData ? cmsData.description : undefined;
      project.name = cmsData ? cmsData.name : project.name;
      project.methodologies = cmsData ? cmsData.methodologies : [];

      project.short_description = cmsData?.projectContent
        ? cmsData.projectContent.shortDescription
        : undefined;
      project.long_description = cmsData?.projectContent
        ? cmsData.projectContent.longDescription
        : undefined;

      delete project.listings;

      return { ...project, price: listingPrice };
    });
    const pooledProjects = offsetData.carbonOffsets.map(function (project) {
      /** Ignore projects for which the MARKETPLACE contained data */
      if (project.display == false) {
        return null;
      }
      const uniqueValues = [];

      if (parseFloat(project.balanceUBO) >= 1) {
        const isDefault =
          POOL_INFO.ubo.defaultProjectTokenAddress.toLowerCase() ===
          project.tokenAddress.toLowerCase();
        const priceKey = isDefault ? "defaultPrice" : "selectiveRedeemPrice";
        uniqueValues.push(poolPrices.ubo[priceKey]);
      }
      if (parseFloat(project.balanceNBO) >= 1) {
        const isDefault =
          POOL_INFO.nbo.defaultProjectTokenAddress.toLowerCase() ===
          project.tokenAddress.toLowerCase();
        const priceKey = isDefault ? "defaultPrice" : "selectiveRedeemPrice";
        uniqueValues.push(poolPrices.nbo[priceKey]);
      }
      if (parseFloat(project.balanceNCT) >= 1) {
        const isDefault =
          POOL_INFO.nct.defaultProjectTokenAddress.toLowerCase() ===
          project.tokenAddress.toLowerCase();
        const priceKey = isDefault ? "defaultPrice" : "selectiveRedeemPrice";
        uniqueValues.push(poolPrices.nct[priceKey]);
      }
      if (parseFloat(project.balanceBCT) >= 1) {
        const isDefault =
          POOL_INFO.bct.defaultProjectTokenAddress.toLowerCase() ===
          project.tokenAddress.toLowerCase();
        const priceKey = isDefault ? "defaultPrice" : "selectiveRedeemPrice";
        uniqueValues.push(poolPrices.bct[priceKey]);
      }

      const country = project.country.length ? { id: project.country } : null;

      const cmsData = findProjectWithRegistryIdAndRegistry(
        projectsCmsData,
        project.projectID.split("-")[1],
        project.projectID.split("-")[0]
      );

      const singleProject = {
        id: project.id,
        isPoolProject: true,
        description: cmsData ? cmsData.description : undefined,
        short_description: cmsData?.projectContent
          ? cmsData.projectContent.shortDescription
          : undefined,
        key: project.projectID,
        projectID: project.projectID.split("-")[1],
        name: cmsData ? cmsData.name : project.name,
        methodologies: cmsData ? cmsData.methodologies : [],
        vintage: project.vintageYear,
        projectAddress: project.tokenAddress,
        registry: project.projectID.split("-")[0],
        updatedAt: project.lastUpdate,
        category: {
          id: project.methodologyCategory,
        },
        country: country,
        price: uniqueValues.length
          ? uniqueValues.reduce((a, b) =>
              a.length < b.length ? a : a.length === b.length && a < b ? a : b
            )
          : "0",
        activities: null,
        listings: null,
      };

      return singleProject;
    });

    const filteredProjects = projects
      .concat(pooledProjects)
      /**
       * This is where we run in to trouble because a project might exist in both MARKETPLACE and pooledProjects but only contain pricing in the latter
       * Which means it won't be displayed if it's price is zero but is present in MARKETPLACE
       */
      .filter((project) => Number(project?.price) !== 0);

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
