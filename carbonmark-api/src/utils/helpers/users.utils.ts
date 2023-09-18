import { app } from "firebase-admin";
import { chunk, isEmpty } from "lodash";

type FbUserDocument = {
  profileImgUrl: string;
  description: string;
  handle: string;
  username: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
};
/**
 * This function retrieves a user by their wallet address from the Firestore database.
 */
export const getProfileByAddress = async (params: {
  firebase: app.App;
  address: string;
}): Promise<any> => {
  const doc = await params.firebase
    .firestore()
    .collection("users")
    .doc(params.address.toUpperCase())
    .get();
  if (!doc.exists) return null;
  return doc.data();
};

interface UserProfile {
  address: string;
  createdAt: number;
  description: string;
  handle: string;
  profileImgUrl?: string;
  updatedAt: number;
  username: string;
}

/** @note this may have a max limit of 300 records for ids, need to confirm */
export const getUserDocumentsByIds = async (
  firebase: app.App,
  userIds: string[]
): Promise<FbUserDocument[] | undefined> => {
  // We must split the array of addresses into chunk arrays of 30 elements/ea because firestore "in" queries are limited to 30 items.
  if (!isEmpty(userIds)) {
    const ids = Array.from(userIds);

    const chunks: string[][] = chunk(ids, 30);

    const snapshots = await Promise.all(
      chunks.map((chunk) =>
        firebase
          .firestore()
          .collection("users")
          .where("address", "in", chunk)
          .get()
      )
    );

    return (
      snapshots
        .flatMap((snapshot) => snapshot.docs)
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- need to find a way to enforce typing on firebase
        .map((doc) => doc.data() as FbUserDocument)
    );
  }
};

/**
 * Provide a sorted deduplicated array of lower-case wallet addresses
 * Get a Map of user profiles. Performance-optimized firestore query
 */
export const getUserProfilesByIds = async (params: {
  firebase: app.App;
  addresses: string[];
}): Promise<Map<string, UserProfile>> => {
  const UserProfileMap = new Map<string, UserProfile>();

  const chunks = chunk(params.addresses, 30);
  // .where "in" query is more performant than .getAll(..docIds)
  // but it is limited to 30 items per comparison
  const chunkPromises = chunks.map((chunk) =>
    params.firebase
      .firestore()
      .collection("users")
      .where("address", "in", chunk)
      .get()
  );
  const querySnapshots = await Promise.all(chunkPromises);
  querySnapshots
    .flatMap((s) => s.docs)
    .forEach((d) => {
      if (!d.exists) return;
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- known
      const profile = d.data() as UserProfile;
      UserProfileMap.set(profile.address, profile);
    });
  return UserProfileMap;
};

/**
 * This function retrieves a user by their handle from the Firestore database.
 */
export const getProfileByHandle = async (params: {
  firebase: app.App;
  handle: string;
}) => {
  const snapshot = await params.firebase
    .firestore()
    .collection("users")
    .where("handle", "==", params.handle.toLowerCase())
    .limit(1)
    .get();
  if (snapshot.empty) return null;
  if (snapshot.size > 1) {
    throw new Error(
      `Multiple users found with handle: ${params.handle.toLowerCase()}. This should never happen.`
    );
  }
  return snapshot.docs.at(0)?.data() || null;
};
