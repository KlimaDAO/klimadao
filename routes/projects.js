'use strict'
const { client } = require('./apollo-client.js');
const { GET_PROJECTS, GET_PROJECT_BY_ID } = require('../queries/projects.js');


module.exports = async function (fastify, opts) {
    fastify.route({
        method: 'GET',
        path: '/projects',
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
            handler: async function (request, reply) {
                var {id} = (request.params);
                id = "0"+ id.toString(16);
                
                var data = await client(process.env.GRAPH_API_URL)
                    .query({
                        query: GET_PROJECT_BY_ID,
                        variables: { id }
                    });

                if (data.data.projects[0]) {
                    // this comes from https://thegraph.com/hosted-service/subgraph/klimadao/polygon-bridged-carbon
                    let pools = await client(process.env.CARBON_OFFSETS_GRAPH_API_URL)
                    .query({
                        query: GET_PROJECT_BY_ID,
                        variables: { id }
                    });

                    var projects = data.data.projects[0];
                    projects.pools = pools.data.carbonOffsets;
                    return reply.send(JSON.stringify(projects));
                }
                return reply.notFound();
            }
        })
}
