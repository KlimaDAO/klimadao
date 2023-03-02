'use strict'
const { executeGraphQLQuery } = require('../apollo-client.js');
const { GET_PROJECTS, getProjectsQuery } = require('../queries/projects.js');
const fetch = require('node-fetch')
const { faker } = require('@faker-js/faker');
const { fakeProjects } = require('./fake_data')
const { GET_PROJECT_BY_ID } = require('../queries/project_id.js');
const { POOLED_PROJECTS, getPooledProjectsQuery } = require('../queries/pooled_projects');
const { POOL_PROJECTS } = require('../queries/pool_project.js');
const { POOL_PRICE } = require('../queries/pool_price_in_usdc.js');
const { getAllVintages, getAllCategories, getAllCountries, calculatePoolPrices, findProjectWithRegistryIdAndRegistry } = require('../helpers/utils.js');
const { getSanityClient } = require('../sanity.js');
const { fetchProjects, fetchAllProjects } = require('../sanity/queries.js');

module.exports = async function (fastify, opts) {

    // @TODO: merge with other projects from the poooool
    fastify.route({
        method: 'GET',
        path: '/projects',
        schema: {
            tags: ["project"],
            response: {
                '2xx': {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        key: { type: 'string' },
                        projectID: { type: 'string' },
                        name: { type: 'string' },
                        methodology: { type: 'string' },
                        vintage: { type: 'string' },
                        projectAddress: { type: 'string' },
                        registry: { type: 'string' },
                        country: { type: 'string' },
                        category: { type: 'string' },
                        price: { type: 'string' }
                    }
                }
            }
        },
        handler: async function (request, reply) {
            var { country, category, search, vintage } = (request.query);

            if (category) {
                category = category.split(",")
            } else {
                category = await getAllCategories()
            }
            if (country) {
                country = country.split(",")
            } else {
                country = await getAllCountries()
            }
            if (vintage) {
                vintage = vintage.split(",")
            } else {
                vintage = await getAllVintages();
            }


            if (!search) {
                search = '';
            }

            const sanity = getSanityClient();
            const projectsCmsData = await sanity.fetch(fetchAllProjects);



            const poolPrices = await calculatePoolPrices();

            const data = await executeGraphQLQuery(process.env.GRAPH_API_URL, GET_PROJECTS, { country, category, search, vintage }
            );


            let pooledProjectsData = (await executeGraphQLQuery(process.env.CARBON_OFFSETS_GRAPH_API_URL, POOLED_PROJECTS, { country, category, search, vintage })).data;
            const projects = data.data.projects.map(function (project) {
                const uniqueValues = [];
                
                if (pooledProjectsData && pooledProjectsData.carbonOffsets) {
                    var index = pooledProjectsData.carbonOffsets.findIndex(item => item.projectID === project.key && item.vintageYear === project.vintage);
                    if (index != -1) {
                        project.isPoolProject = true;

                        if (parseFloat(pooledProjectsData.carbonOffsets[index].balanceUBO) != 0) {
                            uniqueValues.push((poolPrices.find(obj => obj.name === "ubo")).price);
                                                }
                        if (parseFloat(pooledProjectsData.carbonOffsets[index].balanceNBO) != 0) {
                            uniqueValues.push((poolPrices.find(obj => obj.name === "nbo")).price);
                        }
                        if (parseFloat(pooledProjectsData.carbonOffsets[index].balanceNTC) != 0) {
                            uniqueValues.push((poolPrices.find(obj => obj.name === "ntc")).price);
                        }
                        if (parseFloat(pooledProjectsData.carbonOffsets[index].balanceBCT) != 0) {
                            uniqueValues.push((poolPrices.find(obj => obj.name === "btc")).price);
                        }
                        delete pooledProjectsData.carbonOffsets.splice(index, 1);
                    }
                }

                var price = 0;
                if (project.listings.length) {
                    
                    project.listings.forEach(item => uniqueValues.push(item.singleUnitPrice));
                    let lowestPrice = uniqueValues.reduce((a, b) => a.length < b.length ? a : (a.length === b.length && a < b ? a : b));
                    price = lowestPrice;
                }
                const cmsData = findProjectWithRegistryIdAndRegistry(projectsCmsData, project.projectID, project.registry);
                project.description = cmsData ? cmsData.description.slice(0, 200) : undefined;
                project.name = cmsData? cmsData.name : project.name;
                delete project.listings;
                return { ...project, price }
            });


            const pooledProjects =  pooledProjectsData.carbonOffsets.map( function (project) {


                const uniqueValues = [];

                if (parseFloat(project.balanceUBO) > 0) {
                    uniqueValues.push((poolPrices.find(obj => obj.name === "ubo")).price);
                }
                if (parseFloat(project.balanceNBO) > 0) {
                    uniqueValues.push((poolPrices.find(obj => obj.name === "nbo")).price);
                }
                if (parseFloat(project.balanceNTC) > 0) {
                    uniqueValues.push((poolPrices.find(obj => obj.name === "ntc")).price);
                }
                if (parseFloat(project.balanceBTC) > 0) {
                    uniqueValues.push((poolPrices.find(obj => obj.name === "btc")).price);
                }

                let country = project.country.length ?
                    {
                        "id": project.country
                    } : null;

                    const cmsData = findProjectWithRegistryIdAndRegistry(projectsCmsData, project.projectID.split("-")[1], project.projectID.split("-")[0]);
               
                let singleProject = {
                    "id": project.id,
                    "isPoolProject": true,
                    "description": cmsData ? cmsData.description.slice(0, 200) : undefined,
                    "key": project.projectID,
                    "projectID": project.projectID.split("-")[1],
                    "name": cmsData ? cmsData.name : project.name,
                    "methodology": project.methodology,
                    "vintage": project.vintageYear,
                    "projectAddress": project.tokenAddress,
                    "registry": project.projectID.split("-")[0],
                    "updatedAt": project.lastUpdate,
                    "category": {
                        "id": project.methodologyCategory
                    },
                    "country": country,
                    "price": uniqueValues.length ? uniqueValues.reduce((a, b) => a.length < b.length ? a : (a.length === b.length && a < b ? a : b)) : "0",
                    "activities": null,
                    "listings": null,

                };

                return singleProject;

            });

            // Send the transformed projects array as a JSON string in the response
            // return reply.send(JSON.stringify(projects));
            return reply.send(JSON.stringify(projects.concat(pooledProjects)));
        }
    }),
        fastify.route({
            method: 'GET',
            path: '/projects/:id',
            schema: {
                querystring: {
                    type: 'object',
                    properties: {
                        category: {
                            type: 'string',
                        },
                        country: {
                            type: 'string',
                        },
                        search: {
                            type: 'string',
                        },
                    },

                },
                tags: ["project"]
            },
            handler: async function (request, reply) {
                var { id } = (request.params);
                id = id.split("-")
                var key = `${id[0]}-${id[1]}`;
                var vintageStr = id[2];
                var vintage = (new Date(id[2]).getTime()) / 1000;
               


                var poolProject;
                var data = await executeGraphQLQuery(process.env.GRAPH_API_URL, GET_PROJECT_BY_ID, { key: key, vintageStr: vintageStr });
                var project = undefined;
                if (data.data.projects[0]) {
                    project = { ...data.data.projects[0] };

                    var project = { ...data.data.projects[0] };

                    if (project.listings.length) {


                        const listings = project.listings.map((item) => ({ ...item, selected: false }));

                        await Promise.all(
                            listings.map(async (listing) => {
                                const seller = await fastify.firebase.firestore()
                                    .collection("users")
                                    .doc((listing.seller.id).toUpperCase())
                                    .get();
                                listing.seller = { ...seller.data(), ...listing.seller };
                            })
                        );
                        project.listings = listings;
                    }
                    data = await executeGraphQLQuery(process.env.CARBON_OFFSETS_GRAPH_API_URL, POOL_PROJECTS, { key: key, vintageStr: vintage });
                    if (data.data.carbonOffsets[0]) {
                        poolProject = data.data.carbonOffsets[0];
                        let poolProject = { ...data.data.carbonOffsets[0] };
                        project.isPoolProject = true;
                        project.totalBridged = poolProject.totalBridged;
                        project.totalRetired = poolProject.totalRetired;
                        project.currentSupply = poolProject.currentSupply;
                    } else {
                        project.totalBridged = null;
                        project.totalRetired = null;
                        project.currentSupply = null;
                    }
                } else {

                    var data = await executeGraphQLQuery(process.env.CARBON_OFFSETS_GRAPH_API_URL, POOL_PROJECTS, { key: key, vintageStr: vintageStr });

                    if (data.data.carbonOffsets[0]) {
                        poolProject = data.data.carbonOffsets[0];
                        project = { ...data.data.carbonOffsets[0] }
                        let country = project.country.length ?
                            {
                                "id": project.country
                            } : null;

                        project = {
                            "id": project.id,
                            "isPoolProject": true,
                            "key": project.projectID + '-' + project.vintageYear,
                            "projectID": project.projectID.split("-")[1],
                            "name": project.name,
                            "methodology": project.methodology,
                            "vintage": project.vintageYear,
                            "projectAddress": project.tokenAddress,
                            "registry": project.projectID.split("-")[0],
                            "updatedAt": project.lastUpdate,
                            "category": {
                                "id": project.methodologyCategory
                            },
                            "country": country,
                            "price": '1000000000000000000',
                            "activities": null,
                            "listings": null,
                            "totalBridged": project.totalBridged,
                            "totalRetired": project.totalRetired,
                            "currentSupply": project.currentSupply
                        }

                        project.prices = [];
                        if (poolProject) {
                            if (parseFloat(poolProject.balanceUBO ) > 0) {
                                var result = await executeGraphQLQuery(process.env.POOL_PRICES_GRAPH_API_URL, POOL_PRICE, { id: process.env.LP_UBO_POOL });
                                project.prices.push({
                                    leftToSell: poolProject.balanceUBO,
                                    tokenAddress: process.env.UBO_POOL,
                                    singleUnitPrice: result.data.pair.currentprice,
                                    name: 'UBO',
                                })
                            }
                            if (parseFloat(poolProject.balanceNBO)  > 0) {
                                var result = await executeGraphQLQuery(process.env.POOL_PRICES_GRAPH_API_URL, POOL_PRICE, { id: process.env.LP_NBO_POOL });
                                project.prices.push({
                                    leftToSell: poolProject.balanceNBO,
                                    tokenAddress: process.env.NBO_POOL,
                                    singleUnitPrice: result.data.pair.currentprice,
                                    name: 'UBO',
                                })
                            }
                            if (parseFloat(poolProject.balanceNTC)  > 0) {
                                var result = await executeGraphQLQuery(process.env.POOL_PRICES_GRAPH_API_URL, POOL_PRICE, { id: process.env.LP_NTC_POOL });
                                project.prices.push({
                                    leftToSell: poolProject.balanceNCT,
                                    tokenAddress: process.env.NTC_POOL,
                                    singleUnitPrice: result.data.pair.currentprice,
                                    name: 'NCT',
                                })
                            }
                            if (parseFloat(poolProject.balanceBCT) > 0) {
                                var result = await executeGraphQLQuery(process.env.POOL_PRICES_GRAPH_API_URL, POOL_PRICE, { id: process.env.LP_BTC_POOL });
                                project.prices.push({
                                    leftToSell: poolProject.balanceBCT,
                                    tokenAddress: process.env.BTC_POOL,
                                    singleUnitPrice: result.data.pair.currentprice,
                                    name: 'BCT',
                                })
                            }
                        }
                    }
                }

                if (project) {
                    if (project.registry == "VCS") {

                        const sanity = getSanityClient();

                        const params = {
                            registry: project.registry,
                            registryProjectId: id[1],
                        };

                        const results = await sanity.fetch(fetchProjects, params);
                        project.description = results.description;
                        project.location = results.geolocation;

                    } else if (project.registry == "GS") {

                        var results = await fetch(`https://api.goldstandard.org/projects/${id[1]}`)
                        results = JSON.parse(await results.text());
                        project.description = results.description;
                        project.location = null;
                    }
                    return reply.send(JSON.stringify(project));

                }
                return reply.notFound();
            }
        })


}
