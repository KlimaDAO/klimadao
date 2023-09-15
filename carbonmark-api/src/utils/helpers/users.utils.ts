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
 * @param {app.App} fb - The Firebase app instance.
 * @param {string} wallet - The wallet address of the user.
 * @returns {Promise<any>} The data of the user if found, otherwise null.
 */
export const getUserDocumentByWallet = async (
  fb: app.App,
  wallet: string
): Promise<FirebaseFirestore.DocumentData | undefined> =>
  await fb.firestore().collection("users").doc(wallet.toUpperCase()).get();

export const getUserByWallet = async (
  fb: app.App,
  wallet: string
): Promise<FirebaseFirestore.DocumentData | undefined> =>
  (await getUserDocumentByWallet(fb, wallet))?.data();

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
 * This function retrieves a user by their handle from the Firestore database.
 * @param {app.App} fb - The Firebase app instance.
 * @param {string} handle - The handle of the user.
 * @returns {Promise<any>} The data of the user if found, otherwise null.
 */
export const getUserDocumentByHandle = async (
  fb: app.App,
  handle: string
): Promise<FirebaseFirestore.DocumentData | undefined> => {
  const document = await fb
    .firestore()
    .collection("users")
    .where("handle", "==", handle.toLowerCase())
    .limit(1)
    .get();

  return document.docs.at(0);
};
