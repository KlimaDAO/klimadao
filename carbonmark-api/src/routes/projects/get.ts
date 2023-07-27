// eslint-disable-next-line @typescript-eslint/ban-ts-comment -- just because
// @ts-nocheck
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { mapValues, omit } from "lodash";
import { split } from "lodash/fp";
import { FindProjectsQueryVariables } from "src/.generated/types/marketplace.types";
import { fetchAllProjects } from "../../sanity/queries";
import { getSanityClient } from "../../sanity/sanity";
import { gqlSdk } from "../../utils/gqlSdk";
import { fetchAllPoolPrices } from "../../utils/helpers/fetchAllPoolPrices";
import { findProjectWithRegistryIdAndRegistry } from "../../utils/helpers/utils";
import { POOL_INFO } from "./projects.constants";
import { getDefaultQueryArgs, isMatchingProject } from "./projects.utils";

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

    const [data, pooledProjectsData, projectsCmsData, poolPrices] =
      await Promise.all([
        gqlSdk.marketplace.findProjects(query),
        gqlSdk.offsets.findCarbonOffsets(query),
        sanity.fetch(fetchAllProjects),
        fetchAllPoolPrices(),
      ]);

    //Find the CarbonOffsets that have matching projects in Carbonmark
    const matchingOffsets = pooledProjectsData.carbonOffsets.filter((offset) =>
      data.projects.some((project) => isMatchingProject(offset, project))
    );

    const uniqueValues: string[] = [];

    matchingOffsets.forEach((offset) => {
      const project = data.projects.find((project) =>
        isMatchingProject(offset, project)
      );
      if (parseFloat(offset.balanceUBO) >= 1) {
        const isDefault =
          POOL_INFO.ubo.defaultProjectTokenAddress.toLowerCase() ===
          project?.projectAddress.toLowerCase();
        const priceKey = isDefault ? "defaultPrice" : "selectiveRedeemPrice";
        uniqueValues.push(poolPrices.ubo[priceKey]);
      }
      if (parseFloat(offset.balanceNBO) >= 1) {
        const isDefault =
          POOL_INFO.nbo.defaultProjectTokenAddress.toLowerCase() ===
          project?.projectAddress.toLowerCase();
        const priceKey = isDefault ? "defaultPrice" : "selectiveRedeemPrice";
        uniqueValues.push(poolPrices.nbo[priceKey]);
      }
      if (parseFloat(offset.balanceNCT) >= 1) {
        const isDefault =
          POOL_INFO.nct.defaultProjectTokenAddress.toLowerCase() ===
          project?.projectAddress.toLowerCase();
        const priceKey = isDefault ? "defaultPrice" : "selectiveRedeemPrice";
        uniqueValues.push(poolPrices.nct[priceKey]);
      }
      if (parseFloat(offset.balanceBCT) >= 1) {
        const isDefault =
          POOL_INFO.bct.defaultProjectTokenAddress.toLowerCase() ===
          project?.projectAddress.toLowerCase();
        const priceKey = isDefault ? "defaultPrice" : "selectiveRedeemPrice";
        uniqueValues.push(poolPrices.bct[priceKey]);
      }
    });

    //Return offset
    // const uboOffsets = matchingOffsets.filter(selector("balanceUBO", gt(1)));

    const projects = data.projects.map(function (project) {
      if (pooledProjectsData && pooledProjectsData.carbonOffsets) {
        const indexes = pooledProjectsData.carbonOffsets
          .map((item, idx) => (isMatchingProject(item, project) ? idx : ""))
          .filter(String);
        if (indexes && indexes.length) {
          project.isPoolProject = true;
        }
      }

      let price = 0;
      if (project.listings?.length) {
        project.listings.forEach((item) => {
          if (
            !/^0+$/.test(item.leftToSell) &&
            item.active != false &&
            item.deleted != true
          ) {
            uniqueValues.push(item.singleUnitPrice);
          }
        });

        const lowestPrice = uniqueValues.length
          ? uniqueValues.reduce((a, b) =>
              a.length < b.length ? a : a.length === b.length && a < b ? a : b
            )
          : "0";
        price = lowestPrice;
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

      return { ...project, price };
    });
    const pooledProjects = pooledProjectsData.carbonOffsets.map(function (
      project
    ) {
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
