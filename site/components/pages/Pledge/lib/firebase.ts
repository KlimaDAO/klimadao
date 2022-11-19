import * as admin from "firebase-admin";

import { FIREBASE_ADMIN_CERT } from "lib/secrets";
import { Pledge, PledgeFormValues } from "../types";
import {
  DEFAULT_NONCE,
  createPledgeAttributes,
  putPledgeAttributes,
  verifySignature,
} from ".";

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

export interface findOrCreatePledgeParams {
  pledge: PledgeFormValues;
  pageAddress: string;
  signature: string;
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

    await verifySignature({
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
  } else {
    await verifySignature({
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
