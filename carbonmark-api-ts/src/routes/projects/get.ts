import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { compact, isNumber } from "lodash";
import {
  FindProjectsDocument,
  FindProjectsQuery,
  Project,
} from "../../../.generated/types/marketplace.types";
import {
  CarbonOffset,
  FindCarbonOffsetsDocument,
  FindCarbonOffsetsQuery,
} from "../../../.generated/types/offsets.types";
import {
  calculatePoolPrices,
  findProjectWithRegistryIdAndRegistry,
  getAllCategories,
  getAllCountries,
  getAllVintages,
} from "../../helpers/utils";
import { fetchAllProjects } from "../../sanity/queries";
import { getSanityClient } from "../../sanity/sanity";
import { executeGraphQLQuery } from "../../utils/apollo-client";

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

type Querystring = {
  country: string;
  category: string;
  search: string;
  vintage: string;
};

const isMatchingProject = (offset: CarbonOffset, project: Project) =>
  offset.projectID === project.registry + "-" + project.projectID &&
  offset.vintageYear === project.vintage;

const handler = (fastify: FastifyInstance) =>
  async function (
    request: FastifyRequest<{ Querystring: Querystring }>,
    reply: FastifyReply
  ) {
    // @TODO: merge with other projects from the poooool
    const args = request.query;

    const category =
      args.category.split(",") ?? (await getAllCategories(fastify));
    const country = args.country.split(",") ?? (await getAllCountries(fastify));
    const vintage = args.vintage.split(",") ?? (await getAllVintages(fastify));
    const search = args.search ?? "";

    const sanity = getSanityClient();
    const projectsCmsData = await sanity.fetch(fetchAllProjects);

    const poolPrices = await calculatePoolPrices(fastify);

    const data = await executeGraphQLQuery<FindProjectsQuery>(
      process.env.GRAPH_API_URL,
      FindProjectsDocument,
      { country, category, search, vintage }
    );

    let pooledProjectsData = (
      await executeGraphQLQuery<FindCarbonOffsetsQuery>(
        process.env.CARBON_OFFSETS_GRAPH_API_URL,
        FindCarbonOffsetsDocument,
        { country, category, search, vintage }
      )
    ).data;

    const projects = data.data.projects.map(function (project: any) {
      const uniqueValues: (string | undefined)[] = [];

      if (pooledProjectsData && pooledProjectsData.carbonOffsets) {
        //Find the indexes of the projects that match the offsets
        let indexes = pooledProjectsData.carbonOffsets
          .map((item: any, idx: number) =>
            isMatchingProject(item, project) ? idx : undefined
          )
          .filter(isNumber);

        if (indexes && indexes.length) {
          project.isPoolProject = true;

          indexes.forEach((index) => {
            //We want to hide the offsets that have existing projects.
            //This is a terrible way of doing it @todo use ids to filter
            //@ts-ignore see above
            pooledProjectsData.carbonOffsets[index].display = false;

            if (
              parseFloat(pooledProjectsData.carbonOffsets[index].balanceUBO) >=
              1
            ) {
              uniqueValues.push(
                poolPrices.find((obj: any) => obj.name === "ubo")?.price
              );
            }
            if (
              parseFloat(pooledProjectsData.carbonOffsets[index].balanceNBO) >=
              1
            ) {
              uniqueValues.push(
                poolPrices.find((obj: any) => obj.name === "nbo")?.price
              );
            }
            if (
              parseFloat(pooledProjectsData.carbonOffsets[index].balanceNCT) >=
              1
            ) {
              uniqueValues.push(
                poolPrices.find((obj: any) => obj.name === "ntc")?.price
              );
            }
            if (
              parseFloat(pooledProjectsData.carbonOffsets[index].balanceBCT) >=
              1
            ) {
              uniqueValues.push(
                poolPrices.find((obj: any) => obj.name === "btc")?.price
              );
            }
          });
        }
      }

      let price = 0;
      if (project.listings.length) {
        project.listings.forEach((item: any) => {
          if (
            !/^0+$/.test(item.leftToSell) &&
            item.active != false &&
            item.deleted != true
          ) {
            uniqueValues.push(item.singleUnitPrice);
          }
        });

        let lowestPrice = uniqueValues.length
          ? compact(uniqueValues).reduce((a, b) =>
              a.length < b.length ? a : a.length === b.length && a < b ? a : b
            )
          : "0";
        price = Number(lowestPrice);
      }
      //@todo remove this any when we have sanity typing
      const cmsData: any = findProjectWithRegistryIdAndRegistry(
        projectsCmsData,
        project.projectID,
        project.registry
      );
      project.description = cmsData
        ? cmsData.description.slice(0, 200)
        : undefined;
      project.name = cmsData ? cmsData.name : project.name;
      project.methodologies = cmsData ? cmsData.methodologies : [];
      delete project.listings;

      return { ...project, price };
    });

    const pooledProjects = pooledProjectsData.carbonOffsets.map(function (
      project: any
    ) {
      if (project.display == false) {
        return null;
      }
      const uniqueValues: (string | undefined)[] = [];

      if (parseFloat(project.balanceUBO) >= 1) {
        uniqueValues.push(
          poolPrices.find((obj: any) => obj.name === "ubo")?.price
        );
      }
      if (parseFloat(project.balanceNBO) >= 1) {
        uniqueValues.push(
          poolPrices.find((obj: any) => obj.name === "nbo")?.price
        );
      }
      if (parseFloat(project.balanceNCT) >= 1) {
        uniqueValues.push(
          poolPrices.find((obj: any) => obj.name === "ntc")?.price
        );
      }
      if (parseFloat(project.balanceBCT) >= 1) {
        uniqueValues.push(
          poolPrices.find((obj: any) => obj.name === "btc")?.price
        );
      }

      let country = project.country.length
        ? {
            id: project.country,
          }
        : null;

      //@todo remove this any when we have sanity typing
      const cmsData: any = findProjectWithRegistryIdAndRegistry(
        projectsCmsData,
        project.projectID.split("-")[1],
        project.projectID.split("-")[0]
      );

      let singleProject = {
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
          ? compact(uniqueValues).reduce((a, b) =>
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
      .filter((project) => project != null && project.price !== "0");

    // Send the transformed projects array as a JSON string in the response
    // return reply.send(JSON.stringify(projects));
    return reply.send(JSON.stringify(filteredItems));
  };

const get: FastifyPluginAsync = async (fastify) => {
  fastify.get("/projects", { schema }, handler(fastify));
};

export default get;
