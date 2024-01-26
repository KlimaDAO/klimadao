import { app } from "firebase-admin";
import { chunk } from "lodash";
import { UserProfile } from "../../models/UserProfile.model";

/**
 * This function retrieves a user by their wallet address from the Firestore database.
 */
export const getProfileByAddress = async (params: {
  firebase: app.App;
  address: string;
}): Promise<UserProfile | null> => {
  const doc = await params.firebase
    .firestore()
    .collection("users")
    .doc(params.address.toUpperCase())
    .get();

  if (!doc.exists) return null;
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- known type
  return formatProfile(doc.data() as UserProfile);
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
      UserProfileMap.set(profile.address, formatProfile(profile));
    });
  return UserProfileMap;
};

/**
 * This function retrieves a user by their handle from the Firestore database.
 */
export const getProfileByHandle = async (params: {
  firebase: app.App;
  handle: string;
}): Promise<UserProfile | null> => {
  const snapshot = await params.firebase
    .firestore()
    .collection("users")
    .where("handle", "==", params.handle.toLowerCase())
    .limit(1)
    .get();

  if (snapshot.empty) return null;
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- apply known type
  const profile = snapshot.docs.at(0)?.data() as UserProfile | undefined;
  return profile ? formatProfile(profile) : null;
};
const formatProfile = (profile: UserProfile): UserProfile => {
  return {
    ...profile,
    createdAt: Math.floor(profile.createdAt / 1000),
    updatedAt: Math.floor(profile.updatedAt / 1000),
  };
};
