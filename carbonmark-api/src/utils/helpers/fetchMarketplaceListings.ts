import { utils } from "ethers";
import { FastifyInstance } from "fastify";
import { DocumentData } from "firebase-admin/firestore";
import { assign, chunk } from "lodash";
import {
  ActivityWithUserHandles,
  ListingWithUserHandles,
} from "../../routes/projects/get.types";
import { isActiveListing } from "../../routes/projects/get.utils";
import { gqlSdk } from "../gqlSdk";

type Params = {
  key: string; // Project key `"VCS-981"`
  vintage: string; // Vintage string `"2017"`
  fastify: FastifyInstance; // Fastify instance
};

const filterUnsoldActivity = (activity: { activityType?: string }) =>
  activity.activityType !== "Sold";

/**
 * Query the subgraph for marketplace listings and project data for the given project
 * Filters out deleted, sold-out and inactive listings
 * Fetches seller profile info from firebase
 */
export const fetchMarketplaceListings = async ({
  key,
  vintage,
  fastify,
}: Params): Promise<[ListingWithUserHandles[], ActivityWithUserHandles[]]> => {
  const data = await gqlSdk.marketplace.getProjectsById({
    key,
    vintageStr: vintage,
  });

  const project = data?.projects.at(0);

  const filteredListings = project?.listings?.filter(isActiveListing) || [];
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
    userIds.add(listing.seller.id.toLowerCase())
  );
  formattedActivities.forEach((activity) => {
    userIds.add(activity.seller.id.toLowerCase());
    if (activity.buyer) {
      userIds.add(activity.buyer.id.toLowerCase());
    }
  });

  const usersById = new Map<string, DocumentData | undefined>();

  // We must split the array of addresses into chunk arrays of 30 elements/ea because firestore "in" queries are limited to 30 items.
  if (userIds.size !== 0) {
    const ids = Array.from(userIds);

    const chunks: string[][] = chunk(ids, 30);

    const userDocs = await Promise.all(
      chunks.map((chunk) =>
        fastify.firebase
          .firestore()
          .collection("users")
          .where("address", "in", chunk)
          .get()
      )
    );

    userDocs.forEach((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        usersById.set(doc.id, doc.data());
      });
    });
  }

  const listingsWithProfiles = formattedListings.map((listing) => {
    const sellerData = usersById.get(listing.seller.id.toLowerCase());
    return {
      ...listing,
      seller: {
        ...listing.seller,
        ...sellerData,
      },
    };
  });

  const activitiesWithProfiles = formattedActivities.map((act) => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- seller will be assigned
    const activityWithHandles = { ...act } as ActivityWithUserHandles;
    const sellerData = usersById.get(act.seller.id.toLowerCase());
    if (sellerData) {
      activityWithHandles.seller.handle = sellerData.handle;
    }
    if (act.buyer) {
      const buyerData = usersById.get(act.buyer.id.toLowerCase());
      if (buyerData && buyerData.handle) {
        assign(activityWithHandles.buyer, "handle", buyerData.handle);
      }
    }
    return activityWithHandles;
  });
  return [listingsWithProfiles, activitiesWithProfiles];
};
