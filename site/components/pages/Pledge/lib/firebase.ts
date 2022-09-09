import * as admin from "firebase-admin";

import { FIREBASE_ADMIN_CERT } from "lib/secrets";
import { Pledge, putPledgeParams } from "../types";
import {
  DEFAULT_NONCE,
  createPledgeAttributes,
  putPledgeAttributes,
  verifySignature,
} from ".";
import { decodeSignerAddress } from "./verifySignature";

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

    const signerAddress = decodeSignerAddress({
      nonce: currentPledge.nonce,
      signature: params.signature,
    });

    // TODO here is where we handle the different cases
    // 1. owner address, allow all edits
    // 2. confirming a secondary wallet address (set to true)
    // 3. deleting a secondary wallet address (set to false)

    verifySignature({
      address: currentPledge.ownerAddress,
      signature: params.signature,
      nonce: currentPledge.nonce.toString(),
    });
    // we know that it was signed by the owner

    const pledgeAttributes = putPledgeAttributes({
      currentPledgeValues: currentPledge,
      newPledgeValues: params.pledge,
    });

    await pledgeRef.ref.update(pledgeAttributes);

    return pledgeAttributes;
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
