'use strict'
const { executeGraphQLQuery } = require('../apollo-client.js');
const { GET_PROJECTS } = require('../queries/projects.js');
const fetch = require('node-fetch')
const { faker } = require('@faker-js/faker');
const {fakeProjects} = require('./fake_data')
const { GET_PROJECT_BY_ID } = require('../queries/project_id.js');

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

            //@todo -> calculate the minimum price
            const data = await executeGraphQLQuery(GET_PROJECTS);

            // Transform the projects array by adding a property 'price' with a value of '10000000' to each project
            const projects = data.data.projects.map(project => ({
                ...project,
                price: '10000000'
            }));

            if (process.env.ENV == 'local') {
                projects.splice(1, 1);


                let year = 2014;
                let startCount = projects.length;

                for (; startCount < 20; startCount++) {
                    projects.push({
                        "id": "fake",
                        "key": "GS-500-FAKE",
                        "projectID": "500",
                        "name": 'FAKE ' + faker.lorem.sentence(4) + ' FAKE',
                        "methodology": faker.lorem.sentence(10),
                        "vintage": year,
                        "projectAddress": "0xa1c1ccd8c61fec141aaed6b279fa4400b68101d4",
                        "registry": startCount % 2 ? "GS" : "VS",
                        "category": {
                            "id": "Other"
                        },
                        "country": {
                            "id": "Sudan"
                        }
                    });
                    year++;
                }

            }

            // Send the transformed projects array as a JSON string in the response
            return reply.send(JSON.stringify(projects));
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
                tags: ["project"],
                response: {
                    '2xx': {
                        type: 'object',
                        properties: {
                            handle: { type: 'string' },
                            username: { type: 'string' },
                            description: { type: 'string' },
                            wallet: { type: 'string' },
                            listings: { type: 'array' },
                            activities: { type: 'array' }
                        }
                    }
                }
            },
            handler: async function (request, reply) {
                var { id } = (request.params);
                var { country, category, search } = (request.query);
                id = id.split("-")
                var key = `${id[0]}-${id[1]}`;
                var vintageStr = id[2];
                var vintage = (new Date(id[2]).getTime()) / 1000;



                if (id.includes("FAKE")) {
                    return reply.send(JSON.stringify(
                        fakeProjects
                    ))
                }
                var data = await executeGraphQLQuery(GET_PROJECT_BY_ID, { key: key, vintageStr: vintageStr });

                if (data.data.projects[0]) {
                    // this comes from https://thegraph.com/hosted-service/subgraph/klimadao/polygon-bridged-carbon


                    if (process.env.ENV != 'local') {
                        let pools = await client(process.env.CARBON_OFFSETS_GRAPH_API_URL)
                            .query({
                                query: GET_PROJECT_BY_ID,
                                variables: { projectID, vintage }
                            });
                        var projects = data.data.projects[0];
                        projects = { ...projects }
                        projects.pools = pools.data.carbonOffsets;
                        if (projects.registry == "VCS") {
                            const results = await fetch(`https://registry.verra.org/uiapi/resource/resourceSummary/${id[1]}`)
                            projects.location = JSON.parse(await results.text()).location;
                        }

                    } else {
                        var project = { ...data.data.projects[0] };
                        project.pools = [
                            {
                                "id": "0x004090eef602e024b2a6cb7f0c1edda992382994",
                                "name": "",
                                "tokenAddress": "0x004090eef602e024b2a6cb7f0c1edda992382994",
                                "bridge": "Toucan",
                                "vintage": "1199059200",
                                "projectID": key,
                                "balanceBCT": "0",
                                "balanceNCT": "0",
                                "balanceUBO": "0",
                                "balanceNBO": "0",
                                "totalRetired": "0",
                                "currentSupply": "32928"
                            },
                        ]
                        project.location = {
                            "latitude": 30.735555,
                            "longitude": 114.544166
                        }
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
                    }
                    return reply.send(JSON.stringify(project));
                }
                return reply.notFound();
            }
        })
}
