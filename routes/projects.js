'use strict'
const { client } = require('../apollo-client.js');
const { GET_PROJECTS } = require('../queries/projects.js');
const fetch = require('node-fetch')

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
            var data = await client(process.env.GRAPH_API_URL)
                .query({
                    query: GET_PROJECTS,
                });

                console.log(data.data.projects);
            var projects = [];
            for (let i = 0 ; i < data.data.projects.length ; i++) {
                projects[i] = {...data.data.projects[i],
                    price: '10000000'
                }
             
            }
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
                console.log(key, vintageStr );

                var data = await client(process.env.GRAPH_API_URL)
                    .query({
                        query: GET_PROJECT_BY_ID,
                        variables: { key: key, vintageStr: vintageStr}
                    });
                    console.log(data)
                if (data.data.projects[0]) {
                    // this comes from https://thegraph.com/hosted-service/subgraph/klimadao/polygon-bridged-carbon

                    if (process.env.ENV != 'local') {
                        let pools = await client(process.env.CARBON_OFFSETS_GRAPH_API_URL)
                            .query({
                                query: GET_PROJECT_BY_ID,
                                variables: { projectID, vintage }
                            });
                        var projects = data.data.projects[0];
                        projects = {...projects}
                        projects.pools = pools.data.carbonOffsets;
                        if (projects.registry == "VCS") {
                            const results = await fetch(`https://registry.verra.org/uiapi/resource/resourceSummary/${id[1]}`)
                            projects.location = JSON.parse(await results.text()).location;
                        }

                    } else {
                        var projects = data.data.projects[0];
                        var projects = {...projects}
                        projects.pools = [
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
                        projects.location =   {
                            "latitude": 30.735555,
                            "longitude": 114.544166
                        }
                    }
                    return reply.send(JSON.stringify(projects));
                }
                return reply.notFound();
            }
        })
}
