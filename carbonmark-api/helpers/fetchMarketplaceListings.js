// @ts-check
import { executeGraphQLQuery } from "../apollo-client";
import { GET_PROJECT_BY_ID } from "../queries/project_id";

/**
 * @typedef {Object} ListingWithProfile
 *  See subgraph query, this typedef is not complete
 */

/**
 * @typedef {Object} ActivitiesWithProfile
 *  See subgraph query, this typedef is not complete
 */

/**
 * @typedef {Object} Params
 * @property {string} key - Project key `"VCS-981"`
 * @property {string} vintage - Vintage string `"2017"`
 * @property {any} fastify - Fastify instance
 */

const filterActiveListing = (listing) =>
  Number(listing.leftToSell) > 1 && !!listing.active && !listing.deleted;

const filterUnsoldActivity = (activity) => activity.activityType !== "Sold";
/**
 * Query the subgraph for marketplace listings and project data for the given project
 * Filters out deleted, sold-out and inactive listings
 * Fetches seller profile info from firebase
 * @param {Params} params
 *  @example fetchMarketplaceListings({ key: "VCS-981", vintage: "2017", fastify })
 * @returns {Promise<ListingWithProfile[], ActivitiesWithProfile[]>}
 */
export const fetchMarketplaceListings = async ({ key, vintage, fastify }) => {
  try {
    const { data } = await executeGraphQLQuery(
      process.env.GRAPH_API_URL, // marketplace subgraph
      GET_PROJECT_BY_ID,
      { key, vintageStr: vintage }
    );

    const project = data?.projects?.[0] || null;
    const filteredListings =
      project?.listings?.filter(filterActiveListing) || [];
    const filteredActivities =
      project?.activities?.filter(filterUnsoldActivity) || [];

    const getListingsWithProfiles = Promise.all(
      filteredListings.map(async (listing) => {
        const seller = await fastify.firebase
          .firestore()
          .collection("users")
          .doc(listing.seller.id.toUpperCase())
          .get();
        return {
          ...listing,
          seller: {
            ...listing.seller,
            ...seller.data(),
          },
        };
      })
    );
    const getActivitiesWithProfiles = Promise.all(
      filteredActivities.map(async (act) => {
        let activityWithHandles = { ...act };
        const seller = await fastify.firebase
          .firestore()
          .collection("users")
          .doc(act.seller.id.toUpperCase())
          .get();
        if (seller.exists) {
          activityWithHandles.seller.handle = seller.data().handle;
        }
        if (act.buyer) {
          const buyer = await fastify.firebase
            .firestore()
            .collection("users")
            .doc(act.buyer.id.toUpperCase())
            .get();
          if (buyer.exists) {
            activityWithHandles.buyer.handle = buyer.data().handle;
          }
        }
        return activityWithHandles;
      })
    );

    const [listingsWithProfiles, activitiesWithProfiles] = await Promise.all([
      getListingsWithProfiles,
      getActivitiesWithProfiles,
    ]);

    return [listingsWithProfiles, activitiesWithProfiles];
  } catch (err) {
    console.error("fetchMarketplaceListings failed:", err.message);
    throw new Error(err.message);
  }
};
