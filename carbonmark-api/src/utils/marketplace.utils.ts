import { merge } from "lodash";
import { Listing } from "src/.generated/types/marketplace.types";
import { FirebaseInstance } from "src/plugins/firebase";
import { getFirebaseUser } from "./firebase.utils";
import { notNil } from "./functional.utils";

export const updateListingUser =
  (fb: FirebaseInstance) => async (listing: Partial<Listing>) => {
    const sellerId = listing.seller?.id.toUpperCase();
    const { data } = await getFirebaseUser(sellerId, fb);
    const seller = merge({ ...data() }, listing.seller);
    return { ...listing, seller };
  };

export const isListingActive = (listing: Partial<Listing>) =>
  notNil(listing.leftToSell) &&
  !/^0+$/.test(listing.leftToSell) &&
  listing.active != false &&
  listing.deleted != true;

/**
 * Expects project id to be of type <registrar>-<id>-<vintage>
 * @todo add a regular expression test
 */
export const deconstructListingId = (str: string) => {
  const id = str.split("-");
  const key = `${id[0]}-${id[1]}`;
  const vintage = id[2];
  return {
    key,
    vintage,
  };
};
