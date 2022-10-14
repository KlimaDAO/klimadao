import * as admin from "firebase-admin";

import { FIREBASE_ADMIN_CERT } from "lib/secrets";
import { Pledge, putPledgeParams } from "../types";
import {
  DEFAULT_NONCE,
  createPledgeAttributes,
  putPledgeAttributes,
  verifySignature,
} from ".";
import {
  approveSecondaryWallet,
  removeSecondaryWallet,
} from "./editPledgeSignature";
import { verifySignedMessage } from "./verifySignature";

const initFirebaseAdmin = () => {
  if (!FIREBASE_ADMIN_CERT) {
    throw new Error("Firebase env not set");
  }

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(FIREBASE_ADMIN_CERT)),
    });
  }
  return admin.firestore();
};

export const getPledgeByAddress = async (address: string): Promise<Pledge> => {
  const db = initFirebaseAdmin();
  const pledgeCollectionRef = db.collection(
    "pledges"
  ) as admin.firestore.CollectionReference<Pledge>;
  const pledgeSnapshot = await pledgeCollectionRef
    .where("ownerAddress", "==", address)
    .get();

  const pledgeRef = pledgeSnapshot.docs[0];

  if (!pledgeRef) {
    throw new Error("Bad request");
  }

  return pledgeRef.data();
};

export const findOrCreatePledge = async (
  params: putPledgeParams
): Promise<Pledge | null> => {
  const db = initFirebaseAdmin();
  const pledgeCollectionRef = db.collection(
    "pledges"
  ) as admin.firestore.CollectionReference<Pledge>;

  if (!!params.pledge.id) {
    const pledgeRef = await pledgeCollectionRef.doc(params.pledge.id).get();
    const currentPledge = pledgeRef.data();

    if (!currentPledge) return null;
    // check current pledge here which will still be an object. always check currentPledge for pending, etc bc currentPledge is source of truth
    const invitedAddress =
      params.secondaryWalletAddress &&
      currentPledge.wallets &&
      currentPledge.wallets[params.secondaryWalletAddress] &&
      currentPledge.wallets[params.secondaryWalletAddress].status === "pending";
    const verifiedAddress =
      params.secondaryWalletAddress &&
      currentPledge.wallets &&
      currentPledge.wallets[params.secondaryWalletAddress] &&
      currentPledge.wallets[params.secondaryWalletAddress].status ===
        "verified";

    const snapshot = await admin
      .firestore()
      .collection("pledges")
      .where(
        `wallets.${params.secondaryWalletAddress}.status`,
        "==",
        "verified"
      )
      .get();
    // if its already add it then un add from other pledge?
    const isNotAlreadyAdded = snapshot.empty;
    // check if secondary wallet is signing to accept
    if (invitedAddress && isNotAlreadyAdded && params.secondaryWalletAddress) {
      const isVerifying = verifySignedMessage({
        expectedMessage: approveSecondaryWallet(currentPledge.nonce.toString()),
        expectedAddress: params.secondaryWalletAddress,
        signature: params.signature,
      });
      console.log("isVerifying", isVerifying);
      if (isVerifying) {
        await admin
          .firestore()
          .collection("pledges")
          .doc(params.pledge.id)
          .update(
            `wallets.${params.secondaryWalletAddress}.status`,
            "verified"
          );
        return putPledgeAttributes({
          currentPledgeValues: currentPledge,
          newPledgeValues: params.pledge,
        });
      }
    }
    if (!isNotAlreadyAdded) {
      // do error message "please remove yourself from XXX pledge"
      // respond with error message here and check in pages/api/pledge
      // in follow up PR handle errors
    }
    // check if secondary wallet is signing to reject or remove
    if ((invitedAddress || verifiedAddress) && params.secondaryWalletAddress) {
      const isRejecting = verifySignedMessage({
        expectedMessage: removeSecondaryWallet(currentPledge.nonce.toString()),
        expectedAddress: params.secondaryWalletAddress,
        signature: params.signature,
      });
      isRejecting &&
        (await admin
          .firestore()
          .collection("pledges")
          .doc(params.pledge.id)
          .update(
            `wallets.${params.secondaryWalletAddress}.status`,
            "rejected"
          ));
      // modify the status then update newWallets to send to putPledgeAttributes
      const newWallets = { ...currentPledge.wallets };
      newWallets[params.secondaryWalletAddress].status = "rejected";
      return putPledgeAttributes({
        currentPledgeValues: currentPledge,
        newPledgeValues: {
          ...params.pledge,
          wallets: Object.values(newWallets),
        },
      });
    } else {
      verifySignature({
        address: currentPledge.ownerAddress,
        signature: params.signature,
        nonce: currentPledge.nonce.toString(),
      });

      const pledgeAttributes = putPledgeAttributes({
        currentPledgeValues: currentPledge,
        newPledgeValues: params.pledge,
      });

      await pledgeRef.ref.update(pledgeAttributes);

      return pledgeAttributes;
    }
  } else {
    verifySignature({
      address: params.pageAddress,
      signature: params.signature,
      nonce: DEFAULT_NONCE,
    });

    const newPledgeRef = pledgeCollectionRef.doc();
    const pledgeAttributes = createPledgeAttributes({
      id: newPledgeRef.id,
      pledge: params.pledge,
    });

    await newPledgeRef.set(pledgeAttributes);

    return pledgeAttributes;
  }
};
