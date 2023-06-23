"use strict";
import { fetchMarketplaceListings } from "../helpers/fetchMarketplaceListings";
import { fetchPoolPricesAndStats } from "../helpers/fetchPoolPricesAndStats";
import { fetchProjectDetails } from "../helpers/fetchProjectDetails";
const { executeGraphQLQuery } = require("../apollo-client.js");
const { GET_PROJECTS } = require("../queries/projects.js");
const { POOLED_PROJECTS } = require("../queries/pooled_projects");
const {
  getAllVintages,
  getAllCategories,
  getAllCountries,
  calculatePoolPrices,
  findProjectWithRegistryIdAndRegistry,
} = require("../helpers/utils.js");
const { getSanityClient } = require("../sanity.js");
const { fetchAllProjects } = require("../sanity/queries.js");

module.exports = async function (fastify, opts) {
  // @TODO: merge with other projects from the poooool
  fastify.route({
    method: "GET",
    path: "/projects",
    schema: {
      tags: ["project"],
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
    },
    handler: async function (request, reply) {
      var { country, category, search, vintage } = request.query;

      const [categories, countries, vintages] = await Promise.all([
        getAllCategories(fastify),
        getAllCountries(fastify),
        getAllVintages(fastify),
      ]);

      if (category) {
        category = category.split(",");
      } else {
        category = categories;
      }
      if (country) {
        country = country.split(",");
      } else {
        country = countries;
      }
      if (vintage) {
        vintage = vintage.split(",");
      } else {
        vintage = vintages;
      }

      if (!search) {
        search = "";
      }

      const sanity = getSanityClient();

      const [data, pooledProjectsData, projectsCmsData, poolPrices] =
        await Promise.all([
          executeGraphQLQuery(process.env.GRAPH_API_URL, GET_PROJECTS, {
            country,
            category,
            search,
            vintage,
          }),
          executeGraphQLQuery(
            process.env.CARBON_OFFSETS_GRAPH_API_URL,
            POOLED_PROJECTS,
            { country, category, search, vintage }
          ),
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

      const projects = data.data.projects.map(function (project) {
        const uniqueValues = [];

        if (pooledProjectsData.data && pooledProjectsData.data.carbonOffsets) {
          let indexes = pooledProjectsData.data.carbonOffsets
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
              pooledProjectsData.data.carbonOffsets[index].display = false;
              if (
                parseFloat(
                  pooledProjectsData.data.carbonOffsets[index].balanceUBO
                ) >= 1
              ) {
                uniqueValues.push(
                  poolPrices.find((obj) => obj.name === "ubo").price
                );
              }
              if (
                parseFloat(
                  pooledProjectsData.data.carbonOffsets[index].balanceNBO
                ) >= 1
              ) {
                uniqueValues.push(
                  poolPrices.find((obj) => obj.name === "nbo").price
                );
              }
              if (
                parseFloat(
                  pooledProjectsData.data.carbonOffsets[index].balanceNCT
                ) >= 1
              ) {
                uniqueValues.push(
                  poolPrices.find((obj) => obj.name === "ntc").price
                );
              }
              if (
                parseFloat(
                  pooledProjectsData.data.carbonOffsets[index].balanceBCT
                ) >= 1
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

        var price = 0;
        if (project.listings.length) {
          project.listings.forEach((item) => {
            if (
              !/^0+$/.test(item.leftToSell) &&
              item.active != false &&
              item.deleted != true
            ) {
              uniqueValues.push(item.singleUnitPrice);
            }
          });

          let lowestPrice = uniqueValues.length
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
        project.description = cmsData
          ? cmsData.description.slice(0, 200)
          : undefined;
        project.name = cmsData ? cmsData.name : project.name;
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

      const pooledProjects = pooledProjectsData.data.carbonOffsets.map(
        function (project) {
          if (project.display == false) {
            return null;
          }
          const uniqueValues = [];

          if (parseFloat(project.balanceUBO) >= 1) {
            uniqueValues.push(
              poolPrices.find((obj) => obj.name === "ubo").price
            );
          }
          if (parseFloat(project.balanceNBO) >= 1) {
            uniqueValues.push(
              poolPrices.find((obj) => obj.name === "nbo").price
            );
          }
          if (parseFloat(project.balanceNCT) >= 1) {
            uniqueValues.push(
              poolPrices.find((obj) => obj.name === "ntc").price
            );
          }
          if (parseFloat(project.balanceBCT) >= 1) {
            uniqueValues.push(
              poolPrices.find((obj) => obj.name === "btc").price
            );
          }

          let country = project.country.length
            ? {
                id: project.country,
              }
            : null;

          const cmsData = findProjectWithRegistryIdAndRegistry(
            projectsCmsData,
            project.projectID.split("-")[1],
            project.projectID.split("-")[0]
          );

          let singleProject = {
            id: project.id,
            isPoolProject: true,
            description: cmsData
              ? cmsData.description.slice(0, 200)
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
                  a.length < b.length
                    ? a
                    : a.length === b.length && a < b
                    ? a
                    : b
                )
              : "0",
            activities: null,
            listings: null,
          };

          return singleProject;
        }
      );

      const filteredItems = projects
        .concat(pooledProjects)
        .filter((project) => project != null && project.price !== "0");

      // Send the transformed projects array as a JSON string in the response
      // return reply.send(JSON.stringify(projects));
      return reply.send(JSON.stringify(filteredItems));
    },
  }),
    fastify.route({
      method: "GET",
      path: "/projects/:id",
      schema: {
        querystring: {
          type: "object",
          properties: {
            category: {
              type: "string",
            },
            country: {
              type: "string",
            },
            search: {
              type: "string",
            },
          },
        },
        tags: ["project"],
      },
      handler: async function (request, reply) {
        var { id } = request.params;
        const [registryParam, registryProjectId, vintage] = id.split("-");
        const registry = registryParam.toUpperCase();
        const key = `${registry}-${registryProjectId}`;

        const [[poolPrices, stats], [listings, activities], projectDetails] =
          await Promise.all([
            fetchPoolPricesAndStats({ key, vintage }),
            fetchMarketplaceListings({ key, vintage, fastify }),
            fetchProjectDetails({
              registry: registry.toUpperCase(),
              registryProjectId,
            }),
          ]);
        if (!projectDetails) {
          // only render pages if project details exist (render even if there are no listings!)
          return reply.notFound();
        }

        const poolPriceValues = poolPrices.map((p) =>
          Number(p.singleUnitPrice)
        );
        const listingPriceValues = listings.map((l) =>
          Number(l.singleUnitPrice)
        );

        const bestPrice =
          [
            ...poolPriceValues, // these are already formatted as usd numbers
            ...listingPriceValues,
          ].sort((a, b) => a - b)[0] || 0;

        const projectResponse = {
          ...projectDetails,
          stats,
          prices: poolPrices,
          listings,
          activities,
          price: parseFloat(bestPrice).toString(), // remove trailing zeros
          isPoolProject: !!poolPrices.length,
          vintage,
        };
        return reply.send(JSON.stringify(projectResponse));
      },
    });
};
