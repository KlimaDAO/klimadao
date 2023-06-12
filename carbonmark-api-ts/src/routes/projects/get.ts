import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { compact, isNumber } from "lodash";
import { Project } from "../../../.generated/types/marketplace.types";
import { CarbonOffset } from "../../../.generated/types/offsets.types";
import {
  calculatePoolPrices,
  findProjectWithRegistryIdAndRegistry,
  getAllCategories,
  getAllCountries,
  getAllVintages,
} from "../../helpers/utils";
import { fetchAllProjects } from "../../sanity/queries";
import { getSanityClient } from "../../sanity/sanity";
import { extract, notEmpty } from "../../utils/functional.utils";
import { gqlSdk } from "../../utils/gqlSdk";

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
  country?: string;
  category?: string;
  search?: string;
  vintage?: string;
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
      args.category?.split(",") ??
      (await getAllCategories(fastify)).map(extract("id"));

    const country =
      args.country?.split(",") ??
      (await getAllCountries(fastify)).map(extract("id"));

    const vintage = args.vintage?.split(",") ?? (await getAllVintages(fastify));

    const search = args.search ?? "";

    const sanity = getSanityClient();
    const projectsCmsData = await sanity.fetch(fetchAllProjects);

    const poolPrices = await calculatePoolPrices(fastify);

    const queryArgs = { country, category, search, vintage };

    const { projects: fetchedProjects } = await gqlSdk.marketplace.findProjects(
      queryArgs
    );
    const { carbonOffsets } = await gqlSdk.offsets.findCarbonOffsets(queryArgs);

    const projects = fetchedProjects.map(function (project: any) {
      const uniqueValues: (string | undefined)[] = [];

      if (notEmpty(carbonOffsets)) {
        //Find the indexes of the projects that match the offsets
        const indexes = carbonOffsets
          .map((item: any, idx: number) =>
            isMatchingProject(item, project) ? idx : undefined
          )
          .filter(isNumber);

        if (indexes && indexes.length) {
          project.isPoolProject = true;

          indexes.forEach((index) => {
            //We want to hide the offsets that have existing projects.
            //This is a terrible way of doing it @todo use ids to filter
            //@todo remove this
            //@ts-ignore -- assigning a new attribute to the type that doesn't exist
            carbonOffsets[index].display = false;

            if (parseFloat(carbonOffsets[index].balanceUBO) >= 1) {
              uniqueValues.push(
                poolPrices.find((obj) => obj.name === "ubo")?.price
              );
            }
            if (parseFloat(carbonOffsets[index].balanceNBO) >= 1) {
              uniqueValues.push(
                poolPrices.find((obj) => obj.name === "nbo")?.price
              );
            }
            if (parseFloat(carbonOffsets[index].balanceNCT) >= 1) {
              uniqueValues.push(
                poolPrices.find((obj) => obj.name === "ntc")?.price
              );
            }
            if (parseFloat(carbonOffsets[index].balanceBCT) >= 1) {
              uniqueValues.push(
                poolPrices.find((obj) => obj.name === "btc")?.price
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

        const lowestPrice = uniqueValues.length
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

    const pooledProjects = carbonOffsets.map(function (project: any) {
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

      const country = project.country.length
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
      ?.concat(pooledProjects)
      .filter((project) => project != null && project.price !== "0");

    // Send the transformed projects array as a JSON string in the response
    // return reply.send(JSON.stringify(projects));
    return reply.send(JSON.stringify(filteredItems));
  };

const get: FastifyPluginAsync = async (fastify) => {
  await fastify.get("/projects", { schema }, handler(fastify));
};

export default get;
