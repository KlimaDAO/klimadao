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
import { notEmpty } from "../../utils/functional.utils";
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
  country?: string | string[];
  category?: string | string[];
  search?: string;
  vintage?: string | string[];
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
    let { country, category, search, vintage } = { ...request.query };
    const [categories, countries, vintages] = await Promise.all([
      getAllCategories(fastify),
      getAllCountries(fastify),
      getAllVintages(fastify),
    ]);

    if (category) {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- @todo remove casting
      category = (category as string).split(",");
    } else {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- @todo remove casting
      category = categories as unknown as string[];
    }
    if (country) {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- @todo remove casting
      country = (country as string).split(",");
    } else {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- @todo remove casting
      country = countries as unknown as string[];
    }
    if (vintage) {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- @todo remove casting
      vintage = (vintage as string).split(",");
    } else {
      vintage = vintages;
    }

    if (!search) {
      search = "";
    }

    const sanity = getSanityClient();

    const queryArgs = { country, category, search, vintage };

    const [
      { projects: fetchedProjects },
      { carbonOffsets },
      projectsCmsData,
      poolPrices,
    ] = await Promise.all([
      gqlSdk.marketplace.findProjects(queryArgs),
      gqlSdk.offsets.findCarbonOffsets(queryArgs),
      sanity.fetch(fetchAllProjects),
      calculatePoolPrices(fastify),
    ]);

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
      project.short_description = cmsData.projectContent
        ? cmsData.projectContent.shortDescription
        : undefined;
      project.long_description = cmsData.projectContent
        ? cmsData.projectContent.longDescription
        : undefined;
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
