import { gqlSdk } from "@/utils/gqlSdk";
import { utils } from "ethers";
import { FastifyInstance } from "fastify";
import { assign } from "lodash";
import {
  Activity,
  Listing,
  User,
} from "src/.generated/types/marketplace.types";

type WithHandle<T> = T & { handle?: string };

type ActivityWithUserHandles = Omit<Activity, "seller" | "buyer"> & {
  seller: WithHandle<User>;
  buyer?: WithHandle<User> | null;
};

type Params = {
  key: string; // Project key `"VCS-981"`
  vintage: string; // Vintage string `"2017"`
  fastify: FastifyInstance; // Fastify instance
};

const filterActiveListing = (listing: Omit<Listing, "project">) =>
  Number(listing.leftToSell) > 1 && !!listing.active && !listing.deleted;

const filterUnsoldActivity = (activity: Activity) =>
  activity.activityType !== "Sold";

/**
 * Query the subgraph for marketplace listings and project data for the given project
 * Filters out deleted, sold-out and inactive listings
 * Fetches seller profile info from firebase
 * @param {Params} params
 *  @example fetchMarketplaceListings({ key: "VCS-981", vintage: "2017", fastify })
 * @returns {Promise<ListingWithProfile[], ActivitiesWithProfile[]>}
 */
export const fetchMarketplaceListings = async ({
  key,
  vintage,
  fastify,
}: Params): Promise<
  [Omit<Listing, "project">[], ActivityWithUserHandles[]]
> => {
  const data = await gqlSdk.marketplace.getProjectsById({
    key,
    vintageStr: vintage,
  });

  const project = data?.projects.at(0);
  const filteredListings = project?.listings?.filter(filterActiveListing) || [];
  const filteredActivities =
    project?.activities?.filter(filterUnsoldActivity) || [];

  const formattedListings = filteredListings.map((listing) => ({
    ...listing,
    singleUnitPrice: utils.formatUnits(listing.singleUnitPrice, 6),
    leftToSell: utils.formatUnits(listing.leftToSell, 18),
    totalAmountToSell: utils.formatUnits(listing.totalAmountToSell, 18),
  }));

  const formattedActivities = filteredActivities.map((activity) => ({
    ...activity,
    price: activity.price ? utils.formatUnits(activity.price, 6) : null,
    previousPrice: activity.previousPrice
      ? utils.formatUnits(activity.previousPrice, 6)
      : null,
    amount: activity.amount ? utils.formatUnits(activity.amount, 18) : null,
    previousAmount: activity.previousAmount
      ? utils.formatUnits(activity.previousAmount, 18)
      : null,
  }));

  const getListingsWithProfiles = Promise.all(
    formattedListings.map(async (listing) => {
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
  const getActivitiesWithProfiles: Promise<ActivityWithUserHandles[]> =
    Promise.all(
      formattedActivities.map(async (act) => {
        const activityWithHandles: ActivityWithUserHandles = { ...act };
        const seller = await fastify.firebase
          .firestore()
          .collection("users")
          .doc(act.seller.id.toUpperCase())
          .get();
        if (seller.exists) {
          activityWithHandles.seller.handle = seller.data()?.handle;
        }
        if (act.buyer) {
          const buyer = await fastify.firebase
            .firestore()
            .collection("users")
            .doc(act.buyer.id.toUpperCase())
            .get();
          if (buyer.exists) {
            assign(activityWithHandles, "buyer.handle", buyer.data()?.handle);
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
};
