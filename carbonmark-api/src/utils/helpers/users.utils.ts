import { app } from "firebase-admin";

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
