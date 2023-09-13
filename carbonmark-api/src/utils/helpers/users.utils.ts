import { app } from "firebase-admin";
import { compact, isEmpty } from "lodash";
import { User, isUser } from "../../models/User.model";

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
  fb: app.App,
  ids: string[]
): Promise<User[] | undefined> => {
  if (isEmpty(ids)) return undefined;
  const docRefs = compact(ids).map((id) =>
    fb.firestore().collection("users").doc(id)
  );
  const docs = await fb.firestore().getAll(...docRefs);

  return docs.map((doc) => doc.data()).filter(isUser);
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
