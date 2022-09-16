'use strict'
const { client } = require('../apollo-client.js');
const { GET_PROJECTS, GET_PROJECT_BY_ID } = require('../queries/projects.js');


module.exports = async function (fastify, opts) {
    fastify.route({
        method: 'GET',
        path: '/projects',
        schema: {
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

            var data = await client(process.env.GRAPH_API_URL)
                .query({
                    query: GET_PROJECTS,
                });

            return reply.send(JSON.stringify(data.data.projects));
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
                console.log(id, request.query);
                id = id.split("-")
                var projectID = `${id[0]}-${id[1]}`;
                var vintage = (new Date(id[2]).getTime()) / 1000;

                var data = await client(process.env.GRAPH_API_URL)
                    .query({
                        query: GET_PROJECT_BY_ID,
                        variables: { projectID, vintage, country, category, search }
                    });
                if (data.data.projects[0]) {
                    // this comes from https://thegraph.com/hosted-service/subgraph/klimadao/polygon-bridged-carbon
                    let pools = await client(process.env.CARBON_OFFSETS_GRAPH_API_URL)
                        .query({
                            query: GET_PROJECT_BY_ID,
                            variables: { projectID, vintage }
                        });

                    var projects = data.data.projects[0];
                    projects.pools = pools.data.carbonOffsets;
                    return reply.send(JSON.stringify(projects));
                }
                return reply.notFound();
            }
        })
}
