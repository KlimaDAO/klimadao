'use strict'
const { executeGraphQLQuery } = require('../apollo-client.js');
const { GET_PROJECTS } = require('../queries/projects.js');
const fetch = require('node-fetch')
const { faker } = require('@faker-js/faker');
const {fakeProjects} = require('./fake_data')
const { GET_PROJECT_BY_ID } = require('../queries/project_id.js');
const { POOLED_PROJECTS } = require('../queries/pooled_projects');

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
            const data = await executeGraphQLQuery(process.env.GRAPH_API_URL, GET_PROJECTS);
            let pooledProjectsData =  (await executeGraphQLQuery(process.env.CARBON_OFFSETS_GRAPH_API_URL, POOLED_PROJECTS)).data;
            console.log(pooledProjectsData);
            const projects = data.data.projects.map(function(project) {
                if (pooledProjectsData &&  pooledProjectsData.carbonOffsets ) {
                    var index = pooledProjectsData.carbonOffsets.findIndex(item => item.projectID === project.key && item.vintageYear === project.vintage );

                    delete pooledProjectsData.carbonOffsets[index];
                }

                var price = 0;
                if (project.listings.length) {
                    const uniqueValues = new Set();
                    project.listings.forEach(item => uniqueValues.add(item.singleUnitPrice));
                    price = Math.min(...(Array.from(uniqueValues)));
                }
                delete project.listings;
                return {...project, price}
            });

            if (process.env.ENV == 'local') {
                projects.splice(1, 1);


                let year = 2014;
                let startCount = projects.length;
                let methodogies = ['AM0038', 'AM0043', 'AMS-I.D.', 'VM0002', 'VM0019', 'AM0120', 'VM0041', 'AMS-III.D.', 'VM0004', 'AR-ACM0003', 'VM0021', 'AM0050'];
                let categories = ['Renewable Energy', 'Renewable Energy', 'Renewable Energy','Renewable Energy', 'Renewable Energy', 'Renewable Energy',
            'Agriculture', 'Agriculture', 'Forestry', 'Forestry', 'Other Nature-Based', 'Industrial Processing'
                
            ];

                for (; startCount < 20; startCount++) {
                    projects.push({
                        "id": "fake",
                        "key": "GS-500-FAKE",
                        "projectID": "500",
                        "name": 'FAKE ' + faker.lorem.sentence(4) + ' FAKE',
                        "methodology": methodogies[(startCount - 2) % 12 ],
                        "vintage": year,
                        "projectAddress": "0xa1c1ccd8c61fec141aaed6b279fa4400b68101d4",
                        "registry": startCount % 2 ? "GS" : "VS",
                        "updatedAt":"1673468220",
                        "category": {
                            "id": categories[(startCount - 2) % 12 ]
                        },
                        "country": {
                            "id": "Sudan"
                        },
                        "price": 1000000000000000000,
                        
                    });
                    year++;
                }

            }

            // Send the transformed projects array as a JSON string in the response
            return reply.send(JSON.stringify(projects.concat(pooledProjectsData.carbonOffsets)));
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
                var data = await executeGraphQLQuery(process.env.GRAPH_API_URL, GET_PROJECT_BY_ID, { key: key, vintageStr: vintageStr });

                if (data.data.projects[0]) {
                    // this comes from https://thegraph.com/hosted-service/subgraph/klimadao/polygon-bridged-carbon


                    if (process.env.ENV != 'local') {
                        // let pools = await client(process.env.CARBON_OFFSETS_GRAPH_API_URL)
                        //     .query({
                        //         query: GET_PROJECT_BY_ID,
                        //         variables: { projectID, vintage }
                        //     });
                        // var projects = data.data.projects[0];
                        // projects = { ...projects }
                        // projects.pools = pools.data.carbonOffsets;
                        // if (projects.registry == "VCS") {
                        //     const results = await fetch(`https://registry.verra.org/uiapi/resource/resourceSummary/${id[1]}`)
                        //     projects.location = JSON.parse(await results.text()).location;
                        // }

                    } else {
                        var project = { ...data.data.projects[0] };
                        if (project.registry == "VCS") {
                            var results = await fetch(`https://registry.verra.org/uiapi/resource/resourceSummary/${id[1]}`)
                            results = JSON.parse(await results.text());
                            project.location =results.location;
                            project.description = results.description;
                        } else if(project.registry == "GS") {
                            var results = await fetch(`https://api.goldstandard.org/projects/${id[1]}`)
                            results = JSON.parse(await results.text());
                            project.description = results.description;
                            project.location = {
                                "latitude": 30.735555,
                                "longitude": 114.544166
                            }
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
