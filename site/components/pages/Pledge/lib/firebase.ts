import * as admin from "firebase-admin";

import { FIREBASE_ADMIN_CERT } from "lib/secrets";
import { Pledge, PledgeFormValues } from "../types";
import {
  DEFAULT_NONCE,
  createPledgeAttributes,
  putPledgeAttributes,
  verifySignature,
} from ".";
import {
  approveSecondaryWallet,
  removeSecondaryWallet,
  editPledgeMessage,
} from "./editPledgeMessage";
import { ethers } from "ethers";

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
    const e = new Error(
      `We were unable to find a pledge for address: ${address}`
    );
    e.name = "BadRequest";
    throw e;
  }

  return pledgeRef.data();
};

export interface findOrCreatePledgeParams {
  pledge: PledgeFormValues;
  pageAddress: string;
  signature: string;
  secondaryWalletAddress: string;
}

export const findOrCreatePledge = async (
  params: findOrCreatePledgeParams
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
    const isNotAlreadyAdded = snapshot.empty;
    // if a user is invited they can either remove or confirm so this checks
    // if they are confirming
    const isAccepting =
      params.secondaryWalletAddress &&
      ethers.utils.verifyMessage(
        approveSecondaryWallet(currentPledge.nonce.toString()),
        params.signature
      ) === params.secondaryWalletAddress;
    // check if secondary wallet is signing to accept (could also be true if the user is rejecting so this is problem)
    if (invitedAddress && isNotAlreadyAdded && isAccepting) {
      await verifySignature({
        expectedMessage: approveSecondaryWallet,
        address: params.secondaryWalletAddress,
        signature: params.signature,
        nonce: currentPledge.nonce.toString(),
      });
      // accepting
      await admin
        .firestore()
        .collection("pledges")
        .doc(params.pledge.id)
        .update(`wallets.${params.secondaryWalletAddress}.status`, "verified");
      // modify the status then update newWallets to send to putPledgeAttributes
      const newWallets = { ...currentPledge.wallets };
      newWallets[params.secondaryWalletAddress].status = "verified";
      return putPledgeAttributes({
        currentPledgeValues: currentPledge,
        newPledgeValues: {
          ...params.pledge,
          wallets: Object.values(newWallets),
        },
      });
    }
    if (!isNotAlreadyAdded && isAccepting) {
      // respond with error message here and check error name in pages/api/pledge
      const e = new Error(
        "This wallet is already pinned to another pledge. Please unpin your wallet and try again."
      );
      e.name = "WalletAlreadyPinned";
      throw e;
    }
    // remove wallet from pledge
    if ((invitedAddress || verifiedAddress) && params.secondaryWalletAddress) {
      await verifySignature({
        expectedMessage: removeSecondaryWallet,
        address: params.secondaryWalletAddress,
        signature: params.signature,
        nonce: currentPledge.nonce.toString(),
      });
      await admin
        .firestore()
        .collection("pledges")
        .doc(params.pledge.id)
        .update(`wallets.${params.secondaryWalletAddress}.status`, "rejected");
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
      await verifySignature({
        address: currentPledge.ownerAddress,
        signature: params.signature,
        nonce: currentPledge.nonce.toString(),
        expectedMessage: editPledgeMessage,
      });

      const pledgeAttributes = putPledgeAttributes({
        currentPledgeValues: currentPledge,
        newPledgeValues: params.pledge,
      });

      await pledgeRef.ref.update(pledgeAttributes);

      return pledgeAttributes;
    }
  } else {
    await verifySignature({
      address: params.pageAddress,
      signature: params.signature,
      nonce: DEFAULT_NONCE,
      expectedMessage: editPledgeMessage,
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
