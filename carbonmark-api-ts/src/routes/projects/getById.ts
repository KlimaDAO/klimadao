// import {
//   FastifyInstance,
//   FastifyPluginAsync,
//   FastifyReply,
//   FastifyRequest,
// } from "fastify";
// import { isNil, merge } from "lodash";
// import { assign } from "lodash/fp";
// import { Listing } from "../../../.generated/types/marketplace.types";
// import { CarbonOffset } from "../../../.generated/types/offsets.types";
// import {
//   calculatePoolPrices,
//   calculateProjectPoolPrices,
//   PriceType,
// } from "../../helpers/utils";
// import { getSanityClient } from "../../sanity/sanity";
// import { extract } from "../../utils/functional.utils";
// import { gqlSdk } from "../../utils/gqlSdk";
// import {
//   deconstructListingId,
//   isListingActive,
//   updateListingUser,
// } from "../../utils/marketplace.utils";
// import { PoolProject } from "./projects.types";

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

// interface Params {
//   id: string;
// }

// export type Nullable<T> = {
//   [P in keyof T]: T[P] | null | undefined;
// };

// const handler = (fastify: FastifyInstance) =>
//   async function (
//     request: FastifyRequest<{ Params: Params }>,
//     reply: FastifyReply
//   ) {
//     const { key, vintage: vintageStr } = deconstructListingId(
//       request.params.id
//     );
//     const args = { vintageStr, key };

//     const [poolPrices, { projects }, { carbonOffsets }] = await Promise.all([
//       calculatePoolPrices(fastify),
//       gqlSdk.marketplace.getProjectsById(args),
//       gqlSdk.offsets.getCarbonOffsetsByProjectAndVintage(args),
//     ]);

//     const project = projects?.[0];
//     const offset = carbonOffsets?.[0];

//     // Unselect all listings
//     let updatedListings: Partial<Listing>[] = project?.listings.map(
//       assign({ selected: false })
//     );

//     const res = await Promise.all(
//       updatedListings.map(updateListingUser(fastify.firebase))
//     );

//     // Extract prices
//     const listingPrices = updatedListings
//       ?.filter(isListingActive)
//       .map(extract("singleUnitPrice"));

//     /** */
//     if (offset) {
//       const poolProject: PoolProject & Partial<CarbonOffset> = offset;
//       poolProject.isPoolProject = true;

//       carbonOffsets?.map(function (carbonProject) {
//         const [uniqueValues, pricetypes] = calculateProjectPoolPrices(
//           carbonProject,
//           uniqueValues,
//           poolPrices,
//           pricetypes
//         );
//       });
//       offset.prices = pricetypes;
//     }

//     //
//     if (isNil(offset)) {
//       merge(offset, {
//         totalBridged: null,
//         totalRetired: null,
//         currentSupply: null,
//       });
//     }

//     if (isNil(project)) {
//       {
//         const poolProject = { ...carbonOffsets?.[0] };
//         if (poolProject) {
//           let country = poolProject.country?.length
//             ? {
//                 id: poolProject.country,
//               }
//             : null;

//           const result: any = {
//             id: poolProject.id,
//             isPoolProject: true,
//             key: poolProject.projectID,
//             projectID: poolProject.projectID?.split("-")[1] ?? "",
//             name: poolProject.name,
//             methodology: poolProject.methodology,
//             vintage: poolProject.vintageYear,
//             projectAddress: poolProject.tokenAddress,
//             registry: poolProject.projectID?.split("-")[0] ?? "",
//             updatedAt: poolProject.lastUpdate,
//             category: {
//               id: poolProject.methodologyCategory,
//             },
//             country: country,
//             activities: null,
//             listings: null,
//             totalBridged: project.totalBridged,
//             totalRetired: project.totalRetired,
//             currentSupply: project.currentSupply,
//           };

//           result.prices = [];

//           let pricetypes: PriceType[] = [];
//           if (carbonOffsets && carbonOffsets.length) {
//             carbonOffsets.map(function (carbonProject) {
//               [uniqueValues, pricetypes] = calculateProjectPoolPrices(
//                 carbonProject,
//                 uniqueValues,
//                 poolPrices,
//                 pricetypes
//               );
//             });
//             result.prices = prices;
//           }
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
