import { DocumentData } from "@google-cloud/firestore";
import { utils } from "ethers";
import { FastifyInstance } from "fastify";
import { assign } from "lodash";
import {
  Activity,
  Listing,
  User,
} from "src/.generated/types/marketplace.types";
import { gqlSdk } from "../gqlSdk";

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


  const userIds = new Set<string>();
  formattedListings.forEach((listing) =>
    userIds.add(listing.seller.id.toUpperCase())
  );
  formattedActivities.forEach((activity) => {
    userIds.add(activity.seller.id.toUpperCase());
    if (activity.buyer) {
      userIds.add(activity.buyer.id.toUpperCase());
    }
  });

  let usersById = new Map<string, DocumentData | undefined>();
  
  if (userIds.size !== 0) {

  const userDocs = await fastify.firebase
    .firestore()
    .getAll(
      ...Array.from(userIds).map((id) =>
        fastify.firebase.firestore().collection("users").doc(id)
      )
    );

  usersById = new Map<string, DocumentData | undefined>(
    userDocs.map((doc) => [doc.id, doc.data()])
  );
  }

  const getListingsWithProfiles = formattedListings.map((listing) => {
    const sellerData = usersById.get(listing.seller.id.toUpperCase());
    return {
      ...listing,
      seller: {
        ...listing.seller,
        ...sellerData,
      },
    };
  });

  const getActivitiesWithProfiles: ActivityWithUserHandles[] =
    formattedActivities.map((act) => {
      const activityWithHandles: ActivityWithUserHandles = { ...act };
      const sellerData = usersById.get(act.seller.id.toUpperCase());
      if (sellerData) {
        activityWithHandles.seller.handle = sellerData.handle;
      }
      if (act.buyer) {
        const buyerData = usersById.get(act.buyer.id.toUpperCase());
        if (buyerData && buyerData.handle) {
          assign(activityWithHandles.buyer, "handle", buyerData.handle);
        }
      }
      return activityWithHandles;
    });

  return [getListingsWithProfiles, getActivitiesWithProfiles];
};
