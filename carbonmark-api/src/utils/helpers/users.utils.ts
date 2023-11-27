import { app } from "firebase-admin";
import { chunk } from "lodash";

export interface UserProfile {
  address: string;
  createdAt: number;
  description: string;
  handle: string;
  profileImgUrl?: string | null;
  updatedAt: number;
  username: string;
}

export interface UiUserProfile
  extends Omit<UserProfile, "createdAt" | "updatedAt"> {
  createdAt: string;
  updatedAt: string;
}

/**
 * This function retrieves a user by their wallet address from the Firestore database.
 */
export const getProfileByAddress = async (params: {
  firebase: app.App;
  address: string;
}): Promise<UiUserProfile | null> => {
  const doc = await params.firebase
    .firestore()
    .collection("users")
    .doc(params.address.toUpperCase())
    .get();

  if (!doc.exists) return null;
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- known type
  return getUiUserProfile(doc.data() as UserProfile);
};

/**
 * Provide a sorted deduplicated array of lower-case wallet addresses
 * Get a Map of user profiles. Performance-optimized firestore query
 */
export const getUserProfilesByIds = async (params: {
  firebase: app.App;
  addresses: string[];
}): Promise<Map<string, UiUserProfile>> => {
  const UserProfileMap = new Map<string, UiUserProfile>();

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
      const profile = getUiUserProfile(d.data() as UserProfile);
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
}): Promise<UiUserProfile | null> => {
  const snapshot = await params.firebase
    .firestore()
    .collection("users")
    .where("handle", "==", params.handle.toLowerCase())
    .limit(1)
    .get();

  if (snapshot.empty) return null;
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- apply known type
  const profile = snapshot.docs.at(0)?.data() as UserProfile | undefined;
  return profile ? getUiUserProfile(profile) : null;
};

/**
 * Converts backend profile information into frontend profile information
 * @param timestamp
 * @returns
 */
export function getUiUserProfile(profile: UserProfile): UiUserProfile {
  return {
    address: profile.address,
    description: profile.description,
    handle: profile.handle,
    username: profile.username,
    createdAt: (profile.createdAt / 1000).toFixed(0),
    updatedAt: (profile.updatedAt / 1000).toFixed(0),
  };
}
