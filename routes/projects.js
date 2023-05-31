"use strict";
const { executeGraphQLQuery } = require("../apollo-client.js");
const { GET_PROJECTS } = require("../queries/projects.js");
const fetch = require("node-fetch");
const { GET_PROJECT_BY_ID } = require("../queries/project_id.js");
const { POOLED_PROJECTS } = require("../queries/pooled_projects");
const { POOL_PROJECTS } = require("../queries/pool_project.js");
const {
  getAllVintages,
  getAllCategories,
  getAllCountries,
  calculatePoolPrices,
  findProjectWithRegistryIdAndRegistry,
  calculateProjectPoolPrices,
} = require("../helpers/utils.js");
const { getSanityClient } = require("../sanity.js");
const { fetchProjects, fetchAllProjects } = require("../sanity/queries.js");
const { GET_TOKEN_ADDRESS } = require("../queries/token_address.js");

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
        getAllVintages(fastify)
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


      const [data, pooledProjectsData, projectsCmsData, poolPrices] = await Promise.all([
        executeGraphQLQuery(
          process.env.GRAPH_API_URL,
          GET_PROJECTS,
          { country, category, search, vintage }
        ),
        executeGraphQLQuery(
          process.env.CARBON_OFFSETS_GRAPH_API_URL,
          POOLED_PROJECTS,
          { country, category, search, vintage }
        ),
        sanity.fetch(fetchAllProjects),
        calculatePoolPrices(fastify)
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

          let indexes = pooledProjectsData.data.carbonOffsets.map((item, idx) => (item.projectID === project.registry + '-' + project.projectID &&
            item.vintageYear === project.vintage) ? idx : '').filter(String);
          // var index = pooledProjectsData.carbonOffsets.findIndex(
          //   (item) =>


          //     item.projectID === project.registry + '-' + project.projectID &&
          //     item.vintageYear === project.vintage


          // );
          if (indexes && indexes.length) {
            project.isPoolProject = true;

            indexes.forEach(index => {
              pooledProjectsData.data.carbonOffsets[index].display = false;
              // console.log( pooledProjectsData.carbonOffsets[index].display )
              if (
                parseFloat(pooledProjectsData.data.carbonOffsets[index].balanceUBO) >=
                1
              ) {
                uniqueValues.push(
                  poolPrices.find((obj) => obj.name === "ubo").price
                );
              }
              if (
                parseFloat(pooledProjectsData.data.carbonOffsets[index].balanceNBO) >=
                1
              ) {
                uniqueValues.push(
                  poolPrices.find((obj) => obj.name === "nbo").price
                );
              }
              if (
                parseFloat(pooledProjectsData.data.carbonOffsets[index].balanceNCT) >=
                1
              ) {
                uniqueValues.push(
                  poolPrices.find((obj) => obj.name === "ntc").price
                );
              }
              if (
                parseFloat(pooledProjectsData.data.carbonOffsets[index].balanceBCT) >=
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
        project.short_description = cmsData.projectContent ? cmsData.projectContent.shortDescription : undefined;
        project.long_description = cmsData.projectContent ? cmsData.projectContent.longDescription : undefined;

        delete project.listings;

        return { ...project, price };
      });

      const pooledProjects = pooledProjectsData.data.carbonOffsets.map(function (
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
        .filter((project) => project!= null && project.price !== "0");

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
        var projectId = id.split("-");
        var key = `${projectId[0]}-${projectId[1]}`;
        var vintageStr = projectId[2];
var poolProject;

        const [poolPrices, c3TokenAddress, tco2TokenAddress] = await Promise.all([
          calculatePoolPrices(fastify),
          executeGraphQLQuery(
            process.env.ASSETS_GRAPH_API_URL,
            GET_TOKEN_ADDRESS,
            { symbol: `C3T-${key}-${vintageStr}` }
          ),
          executeGraphQLQuery(
            process.env.ASSETS_GRAPH_API_URL,
            GET_TOKEN_ADDRESS,
            { symbol: `TCO2-${key}-${vintageStr}` }
          )
        ]);

        var uniqueValues = [];
        var prices = [];
        var data = await executeGraphQLQuery(
          process.env.GRAPH_API_URL,
          GET_PROJECT_BY_ID,
          { key: key, vintageStr: vintageStr }
        );
        var project = undefined;
        if (data.data.projects[0]) {
          project = { ...data.data.projects[0] };

          var project = { ...data.data.projects[0] };

          if (project.listings.length) {
            const listings = project.listings.map((item) => ({
              ...item,
              selected: false,
            }));

            project.listings.forEach((item) => {
              if (
                !/^0+$/.test(item.leftToSell) &&
                item.active != false &&
                item.deleted != true
              ) {
                uniqueValues.push(item.singleUnitPrice);
              }
            });

            await Promise.all(
              listings.map(async (listing) => {
                const seller = await fastify.firebase
                  .firestore()
                  .collection("users")
                  .doc(listing.seller.id.toUpperCase())
                  .get();
                listing.seller = { ...seller.data(), ...listing.seller };
              })
            );
            project.listings = listings;
          }
          data = await executeGraphQLQuery(
            process.env.CARBON_OFFSETS_GRAPH_API_URL,
            POOL_PROJECTS,
            { key: key, vintageStr: vintageStr }
          );
          if (data.data.carbonOffsets[0]) {
            let poolProject = { ...data.data.carbonOffsets[0] };
            project.isPoolProject = true;
            project.totalBridged = poolProject.totalBridged;
            project.totalRetired = poolProject.totalRetired;
            project.currentSupply = poolProject.currentSupply;

            var prices = [];
            data.data.carbonOffsets.map(function (carbonProject) {
              [uniqueValues, prices] = calculateProjectPoolPrices(
                carbonProject,
                uniqueValues,
                poolPrices,
                prices
              );
            });
            project.prices = prices;
          } else {
            project.totalBridged = null;
            project.totalRetired = null;
            project.currentSupply = null;
          }
        } else {
          var data = await executeGraphQLQuery(
            process.env.CARBON_OFFSETS_GRAPH_API_URL,
            POOL_PROJECTS,
            { key: key, vintageStr: vintageStr }
          );

          if (data.data.carbonOffsets[0]) {
            poolProject = data.data.carbonOffsets[0];
            project = { ...data.data.carbonOffsets[0] };
            let country = project.country.length
              ? {
                id: project.country,
              }
              : null;

            project = {
              id: project.id,
              isPoolProject: true,
              key: project.projectID,
              projectID: project.projectID.split("-")[1],
              name: project.name,
              methodology: project.methodology,
              vintage: project.vintageYear,
              projectAddress: project.tokenAddress,
              registry: project.projectID.split("-")[0],
              updatedAt: project.lastUpdate,
              category: {
                id: project.methodologyCategory,
              },
              country: country,
              activities: null,
              listings: null,
              totalBridged: project.totalBridged,
              totalRetired: project.totalRetired,
              currentSupply: project.currentSupply,
            };

            project.prices = [];
            prices = [];
            if (data.data.carbonOffsets && data.data.carbonOffsets.length) {
              data.data.carbonOffsets.map(function (carbonProject) {
                [uniqueValues, prices] = calculateProjectPoolPrices(
                  carbonProject,
                  uniqueValues,
                  poolPrices,
                  prices
                );
              });
              project.prices = prices;
            }
          }
        }

        if (project) {
          project.c3TokenAddress = c3TokenAddress.data && c3TokenAddress.data.tokens.length ? c3TokenAddress.data.tokens[0].id : undefined;
          project.tco2TokenAddress = tco2TokenAddress.data && tco2TokenAddress.data.tokens.length ? tco2TokenAddress.data.tokens[0].id : undefined;

          if (project.registry == "VCS") {
            const sanity = getSanityClient();

            const params = {
              registry: project.registry,
              registryProjectId: projectId[1],
            };

            const results = await sanity.fetch(fetchProjects, params);
            project.description = results.description ?? undefined;
            project.location = results.geolocation ?? undefined;
            project.name = results.name;
            project.methodologies = results.methodologies;

            project.images = results.projectContent ? results.projectContent.images : [];
            project.long_description = results.projectContent ? results.projectContent.longDescription : undefined;

            project.url = results.url
          } else if (project.registry == "GS") {
            var results = await fetch(
              `https://api.goldstandard.org/projects/${id[1]}`
            );
            results = JSON.parse(await results.text());
            project.description = results.description;
            project.location = null;
          }


          project.price = uniqueValues.length
            ? uniqueValues.reduce((a, b) =>
              a.length < b.length ? a : a.length === b.length && a < b ? a : b
            )
            : "0";

          if (project.activities) {
            const activities = project.activities;

            await Promise.all(
              activities.map(async (actvity) => {
                if (actvity.activityType != "Sold") {

                  const seller = await fastify.firebase
                    .firestore()
                    .collection("users")
                    .doc(actvity.seller.id.toUpperCase())
                    .get();
                  if (seller.exists) {
                    actvity.seller.handle = seller.data().handle;
                  }
                  if (actvity.buyer) {
                    const buyer = await fastify.firebase
                      .firestore()
                      .collection("users")
                      .doc(actvity.buyer.id.toUpperCase())
                      .get();
                    if (buyer.exists) {
                      actvity.buyer.handle = buyer.data().handle;
                    }
                  }
                }
              })
            );
            project.activities = activities.filter((activity) => activity.activityType !== "Sold");
          }

          return reply.send(JSON.stringify(project));
        }
        return reply.notFound();
      },
    });
};
