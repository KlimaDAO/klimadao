// eslint-disable-next-line @typescript-eslint/ban-ts-comment -- temporarily disable ts to make sure we have all new changes
// @ts-nocheck
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { fetchAllProjects } from "../../sanity/queries";
import { getSanityClient } from "../../sanity/sanity";
import { extract } from "../../utils/functional.utils";
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

// type Querystring = {
//   country?: string;
//   category?: string;
//   search?: string;
//   vintage?: string;
// };

// const isMatchingProject = (offset: CarbonOffset, project: Project) =>
//   offset.projectID === project.registry + "-" + project.projectID &&
//   offset.vintageYear === project.vintage;

const handler = (fastify: FastifyInstance) =>
  async function (request: FastifyRequest, reply: FastifyReply) {
    let { country, category, search, vintage } = request.query;

    const [categories, countries, vintages] = await Promise.all([
      getAllCategories(fastify),
      getAllCountries(fastify),
      getAllVintages(fastify),
    ]);

    if (category) {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- @todo remove casting
      category = (category as string).split(",");
    } else {
      category = categories.map(extract("id"));
    }
    if (country) {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- @todo remove casting
      country = (country as string).split(",");
    } else {
      country = countries.map(extract("id"));
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

    const [data, pooledProjectsData, projectsCmsData, poolPrices] =
      await Promise.all([
        gqlSdk.marketplace.findProjects(queryArgs),
        gqlSdk.offsets.findCarbonOffsets(queryArgs),
        sanity.fetch(fetchAllProjects),
        calculatePoolPrices(fastify),
      ]);

    // const data = await executeGraphQLQuery(
    //   process.env.GRAPH_API_URL,
    //   GET_PROJECTS,
    //   { country, category, search, vintage }
    // );

    // let pooledProjectsData = (
    //   await executeGraphQLQuery(
    //     process.env.CARBON_OFFSETS_GRAPH_API_URL,
    //     POOLED_PROJECTS,
    //     { country, category, search, vintage }
    //   )
    // ).data;

    const projects = data.projects.map(function (project) {
      const uniqueValues = [];

      if (pooledProjectsData && pooledProjectsData.carbonOffsets) {
        const indexes = pooledProjectsData.carbonOffsets
          .map((item, idx) =>
            item.projectID === project.registry + "-" + project.projectID &&
            item.vintageYear === project.vintage
              ? idx
              : ""
          )
          .filter(String);
        // var index = pooledProjectsData.carbonOffsets.findIndex(
        //   (item) =>

        //     item.projectID === project.registry + '-' + project.projectID &&
        //     item.vintageYear === project.vintage

        // );
        if (indexes && indexes.length) {
          project.isPoolProject = true;

          indexes.forEach((index) => {
            pooledProjectsData.carbonOffsets[index].display = false;
            if (
              parseFloat(pooledProjectsData.carbonOffsets[index].balanceUBO) >=
              1
            ) {
              uniqueValues.push(
                poolPrices.find((obj) => obj.name === "ubo").price
              );
            }
            if (
              parseFloat(pooledProjectsData.carbonOffsets[index].balanceNBO) >=
              1
            ) {
              uniqueValues.push(
                poolPrices.find((obj) => obj.name === "nbo").price
              );
            }
            if (
              parseFloat(pooledProjectsData.carbonOffsets[index].balanceNCT) >=
              1
            ) {
              uniqueValues.push(
                poolPrices.find((obj) => obj.name === "ntc").price
              );
            }
            if (
              parseFloat(pooledProjectsData.carbonOffsets[index].balanceBCT) >=
              1
            ) {
              uniqueValues.push(
                poolPrices.find((obj) => obj.name === "btc").price
              );
            }
          });

          // indexes.forEach(index => {
          //   delete pooledProjectsData.carbonOffsets.splice(index, 1);
          // });
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
