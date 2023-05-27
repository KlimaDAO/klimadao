// import {
//   FastifyInstance,
//   FastifyPluginAsync,
//   FastifyReply,
//   FastifyRequest,
// } from "fastify";

// const schema = {
//   querystring: {
//     type: "object",
//     properties: {
//       category: {
//         type: "string",
//       },
//       country: {
//         type: "string",
//       },
//       search: {
//         type: "string",
//       },
//     },
//   },
//   tags: ["project"],
// };

// const handler = (fastify: FastifyInstance) =>
//   async function (request: FastifyRequest, reply: FastifyReply) {
//     var { id } = request.params;
//     id = id.split("-");
//     var key = `${id[0]}-${id[1]}`;
//     var vintageStr = id[2];
//     var vintage = new Date(id[2]).getTime() / 1000;

//     const poolPrices = await calculatePoolPrices(fastify);

//     var uniqueValues = [];
//     var prices = [];
//     var poolProject;
//     var data = await executeGraphQLQuery(
//       process.env.GRAPH_API_URL,
//       GET_PROJECT_BY_ID,
//       { key: key, vintageStr: vintageStr }
//     );
//     var project = undefined;
//     if (data.data.projects[0]) {
//       project = { ...data.data.projects[0] };

//       var project = { ...data.data.projects[0] };

//       if (project.listings.length) {
//         const listings = project.listings.map((item) => ({
//           ...item,
//           selected: false,
//         }));

//         project.listings.forEach((item) => {
//           if (
//             !/^0+$/.test(item.leftToSell) &&
//             item.active != false &&
//             item.deleted != true
//           ) {
//             uniqueValues.push(item.singleUnitPrice);
//           }
//         });

//         await Promise.all(
//           listings.map(async (listing) => {
//             const seller = await fastify.firebase
//               .firestore()
//               .collection("users")
//               .doc(listing.seller.id.toUpperCase())
//               .get();
//             listing.seller = { ...seller.data(), ...listing.seller };
//           })
//         );
//         project.listings = listings;
//       }
//       data = await executeGraphQLQuery(
//         process.env.CARBON_OFFSETS_GRAPH_API_URL,
//         POOL_PROJECTS,
//         { key: key, vintageStr: vintageStr }
//       );
//       if (data.data.carbonOffsets[0]) {
//         console.log(data.data.carbonOffsets);
//         let poolProject = { ...data.data.carbonOffsets[0] };
//         project.isPoolProject = true;
//         project.totalBridged = poolProject.totalBridged;
//         project.totalRetired = poolProject.totalRetired;
//         project.currentSupply = poolProject.currentSupply;

//         var prices = [];
//         data.data.carbonOffsets.map(function (carbonProject) {
//           [uniqueValues, prices] = calculateProjectPoolPrices(
//             carbonProject,
//             uniqueValues,
//             poolPrices,
//             prices
//           );
//         });
//         project.prices = prices;
//       } else {
//         project.totalBridged = null;
//         project.totalRetired = null;
//         project.currentSupply = null;
//       }
//     } else {
//       var data = await executeGraphQLQuery(
//         process.env.CARBON_OFFSETS_GRAPH_API_URL,
//         POOL_PROJECTS,
//         { key: key, vintageStr: vintageStr }
//       );

//       if (data.data.carbonOffsets[0]) {
//         poolProject = data.data.carbonOffsets[0];
//         project = { ...data.data.carbonOffsets[0] };
//         let country = project.country.length
//           ? {
//               id: project.country,
//             }
//           : null;

//         project = {
//           id: project.id,
//           isPoolProject: true,
//           key: project.projectID,
//           projectID: project.projectID.split("-")[1],
//           name: project.name,
//           methodology: project.methodology,
//           vintage: project.vintageYear,
//           projectAddress: project.tokenAddress,
//           registry: project.projectID.split("-")[0],
//           updatedAt: project.lastUpdate,
//           category: {
//             id: project.methodologyCategory,
//           },
//           country: country,
//           activities: null,
//           listings: null,
//           totalBridged: project.totalBridged,
//           totalRetired: project.totalRetired,
//           currentSupply: project.currentSupply,
//         };

//         project.prices = [];
//         prices = [];
//         if (data.data.carbonOffsets && data.data.carbonOffsets.length) {
//           console.log(data.data.carbonOffsets);
//           data.data.carbonOffsets.map(function (carbonProject) {
//             [uniqueValues, prices] = calculateProjectPoolPrices(
//               carbonProject,
//               uniqueValues,
//               poolPrices,
//               prices
//             );
//           });
//           project.prices = prices;
//         }
//       }
//     }

//     if (project) {
//       if (project.registry == "VCS") {
//         const sanity = getSanityClient();

//         const params = {
//           registry: project.registry,
//           registryProjectId: id[1],
//         };

//         const results = await sanity.fetch(fetchProjects, params);
//         project.description = results.description;
//         project.location = results.geolocation;
//         project.name = results.name;
//         project.methodologies = results.methodologies;
//         project.url = results.url;
//       } else if (project.registry == "GS") {
//         var results = await fetch(
//           `https://api.goldstandard.org/projects/${id[1]}`
//         );
//         results = JSON.parse(await results.text());
//         project.description = results.description;
//         project.location = null;
//       }

//       project.price = uniqueValues.length
//         ? uniqueValues.reduce((a, b) =>
//             a.length < b.length ? a : a.length === b.length && a < b ? a : b
//           )
//         : "0";

//       if (project.activities) {
//         const activities = project.activities;

//         await Promise.all(
//           activities.map(async (actvity) => {
//             if (actvity.activityType != "Sold") {
//               const seller = await fastify.firebase
//                 .firestore()
//                 .collection("users")
//                 .doc(actvity.seller.id.toUpperCase())
//                 .get();
//               if (seller.exists) {
//                 actvity.seller.handle = seller.data().handle;
//               }
//               if (actvity.buyer) {
//                 const buyer = await fastify.firebase
//                   .firestore()
//                   .collection("users")
//                   .doc(actvity.buyer.id.toUpperCase())
//                   .get();
//                 if (buyer.exists) {
//                   actvity.buyer.handle = buyer.data().handle;
//                 }
//               }
//             }
//           })
//         );
//         project.activities = activities.filter(
//           (activity) => activity.activityType !== "Sold"
//         );
//       }

//       return reply.send(JSON.stringify(project));
//     }
//     return reply.notFound();
//   };

// const getById: FastifyPluginAsync = async (fastify): Promise<void> => {
//   fastify.get("/projects/:id", { schema }, handler(fastify));
// };

// export default getById;
