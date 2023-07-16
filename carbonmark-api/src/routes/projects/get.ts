import { extract } from "@klimadao/lib/utils/functional.utils";
import { greaterThanOrEqual } from "@klimadao/lib/utils/number.utils";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { sortBy, uniq } from "lodash";
import { assign, get, pipe } from "lodash/fp";
import {
  FindProjectsQueryVariables,
  Project,
} from "src/.generated/types/marketplace.types";
import { CarbonOffset } from "src/.generated/types/offsets.types";
import { fetchAllProjects } from "../../sanity/queries";
import { getSanityClient } from "../../sanity/sanity";
import { gqlSdk } from "../../utils/gqlSdk";
import {
  calculatePoolPrices,
  findProjectWithRegistryIdAndRegistry,
  getAllCategories,
  getAllCountries,
  getAllVintages,
} from "../../utils/helpers/utils";

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
  vintage?: string;
  search?: string;
};

const isMatchingProject =
  (project: Project) => (offset: Partial<CarbonOffset>) =>
    offset.projectID === project.registry + "-" + project.projectID &&
    offset.vintageYear === project.vintage;

const handler = (fastify: FastifyInstance) =>
  async function (
    request: FastifyRequest<{ Querystring: Params }>,
    reply: FastifyReply
  ) {
    const sanity = getSanityClient();

    /** Get all possible options to use if none provided */
    const [categories, countries, vintages] = await Promise.all([
      getAllCategories(fastify),
      getAllCountries(fastify),
      getAllVintages(fastify),
    ]);

    // Build our search object
    const searchParams: FindProjectsQueryVariables = {
      category: request.query.category ?? categories.map(extract("id")),
      country: request.query.country ?? countries.map(extract("id")),
      vintage: request.query.vintage ?? vintages,
    };

    // Fetch project data from all other sources
    const [projectsData, pooledProjectsData, projectsCmsData, poolPrices] =
      await Promise.all([
        gqlSdk.marketplace.findProjects(searchParams),
        gqlSdk.offsets.findCarbonOffsets(searchParams),
        sanity.fetch(fetchAllProjects),
        calculatePoolPrices(fastify),
      ]);

    const projects = projectsData.projects
      .map(assign({ isPoolProject: true }))
      .map((project) => {
        const uniqueValues: number[] = [];

        const offsets = pooledProjectsData.carbonOffsets.filter(
          isMatchingProject(project)
        );

        const keys: (keyof CarbonOffset)[] = [
          "balanceBCT",
          "balanceNBO",
          "balanceNCT",
          "balanceUBO",
        ];

        // Extract token prices
        const [btc, nbo, ntc, ubo] = sortBy(uniq(poolPrices), "name").map(
          extract("price")
        );

        const extractBalance = (key: keyof CarbonOffset) =>
          pipe(get(key), parseFloat);

        // Extract offset balances
        const [btcBalance, nboBalance, nctBalance, uboBalance] = keys.map(
          (key) =>
            offsets.map(extractBalance(key)).filter(greaterThanOrEqual(1))
              .length
        );

        if (btcBalance)
          offsetBalances.forEach((offset) => {
            if (parseFloat(offset.balanceUBO) >= 1) {
              uniqueValues.push(
                poolPrices.find((obj) => obj.name === "ubo").price
              );
            }
            if (parseFloat(offset.balanceNBO) >= 1) {
              uniqueValues.push(
                poolPrices.find((obj) => obj.name === "nbo").price
              );
            }
            if (parseFloat(offset.balanceNCT) >= 1) {
              uniqueValues.push(
                poolPrices.find((obj) => obj.name === "ntc").price
              );
            }
            if (parseFloat(offset.balanceBCT) >= 1) {
              uniqueValues.push(
                poolPrices.find((obj) => obj.name === "btc").price
              );
            }
          });

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
        project.description = cmsData?.description?.slice(0, 200);
        project.name = cmsData?.name ?? project.name;
        project.methodologies = cmsData ? cmsData.methodologies : [];

        project.short_description = cmsData?.projectContent
          ? cmsData.projectContent.shortDescription.slice(0, 200)
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
      if (project.display == false) {
        return null;
      }
      const uniqueValues = [];

      if (parseFloat(project.balanceUBO) >= 1) {
        uniqueValues.push(poolPrices.find((obj) => obj.name === "ubo").price);
      }
      if (parseFloat(project.balanceNBO) >= 1) {
        uniqueValues.push(poolPrices.find((obj) => obj.name === "nbo").price);
      }
      if (parseFloat(project.balanceNCT) >= 1) {
        uniqueValues.push(poolPrices.find((obj) => obj.name === "ntc").price);
      }
      if (parseFloat(project.balanceBCT) >= 1) {
        uniqueValues.push(poolPrices.find((obj) => obj.name === "btc").price);
      }

      const country = project.country.length
        ? {
            id: project.country,
          }
        : null;

      const cmsData = findProjectWithRegistryIdAndRegistry(
        projectsCmsData,
        project.projectID.split("-")[1],
        project.projectID.split("-")[0]
      );

      const singleProject = {
        id: project.id,
        isPoolProject: true,
        description: cmsData ? cmsData.description.slice(0, 200) : undefined,
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

    const filteredItems = projects
      .concat(pooledProjects)
      .filter((project) => Number(project?.price) !== 0);

    // Send the transformed projects array as a JSON string in the response
    return reply.send(JSON.stringify(filteredItems));
  };

export default async (fastify: FastifyInstance) => {
  await fastify.route({
    method: "GET",
    url: "/projects",
    schema,
    handler: handler(fastify),
  });
};
