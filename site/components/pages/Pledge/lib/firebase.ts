import * as admin from "firebase-admin";

import { FIREBASE_ADMIN_CERT } from "lib/secrets";
import {
  createPledgeAttributes,
  DEFAULT_NONCE,
  putPledgeAttributes,
  verifySignature,
} from ".";
import { Pledge, PledgeFormValues } from "../types";
import {
  approveSecondaryWallet,
  editPledgeMessage,
  removeSecondaryWallet,
} from "./editPledgeMessage";

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

export const getParentPledges = async (props: { address: string }) => {
  const db = await initFirebaseAdmin();
  const data = await db
    .collection("pledges")
    .where(`wallets.${props.address}.status`, "==", "verified")
    .get();
  return data;
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
    e.name = "PledgeNotFound";
    throw e;
  }

  return pledgeRef.data();
};

export interface findOrCreatePledgeParams {
  pledge: PledgeFormValues;
  pageAddress: string;
  signature: string;
  secondaryWalletAddress: string;
  action: string;
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

    // check current pledge here which will still be an object. always check currentPledge for pending, etc bc currentPledge is source of truth
    if (!currentPledge) return null;

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
    // check if user is verified on another pledge
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

    // check if secondary wallet is signing to accept (could also be true if the user is rejecting so this is problem)
    if (invitedAddress && isNotAlreadyAdded && params.action === "accepting") {
      await verifySignature({
        expectedMessage: approveSecondaryWallet(currentPledge.nonce.toString()),
        address: params.secondaryWalletAddress,
        signature: params.signature,
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
    if (!isNotAlreadyAdded && params.action === "accepting") {
      const e = new Error(
        "This wallet is already pinned to another pledge. Please unpin your wallet and try again."
      );
      e.name = "WalletAlreadyPinned";
      throw e;
    }
    // remove/reject wallet from pledge
    if (
      (invitedAddress || verifiedAddress) &&
      params.secondaryWalletAddress &&
      params.action === "rejecting"
    ) {
      await verifySignature({
        expectedMessage: removeSecondaryWallet(currentPledge.nonce.toString()),
        address: params.secondaryWalletAddress,
        signature: params.signature,
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
    }
    // update existing pledge document
    await verifySignature({
      address: currentPledge.ownerAddress,
      signature: params.signature,
      expectedMessage: editPledgeMessage(currentPledge.nonce.toString()),
    });

    const pledgeAttributes = putPledgeAttributes({
      currentPledgeValues: currentPledge,
      newPledgeValues: params.pledge,
    });
    // using as unknown as any type here because typescript is throwing errors
    await pledgeRef.ref.update(pledgeAttributes as unknown as any);
    return pledgeAttributes;
  } else {
    // create new pledge document
    await verifySignature({
      address: params.pageAddress,
      signature: params.signature,
      expectedMessage: editPledgeMessage(DEFAULT_NONCE),
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
