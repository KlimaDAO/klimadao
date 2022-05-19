import * as admin from "firebase-admin";

import { FIREBASE_ADMIN_CERT } from "lib/secrets";
import { Footprint, Pledge, putPledgeParams } from "../types";
import {
  verifySignature,
  DEFAULT_NONCE,
  generateNonce,
  createPledgeAttributes,
  putPledgeAttributes,
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

export const findOrCreatePledge = async (
  params: putPledgeParams
): Promise<Pledge> => {
  const db = initFirebaseAdmin();
  const pledgeCollectionRef = db.collection("pledges") as admin.firestore.CollectionReference<Pledge>;
  const pledgeSnapshot = await pledgeCollectionRef
    .where("id", "==", params.pledge.id)
    .get();
  const pledgeRef = pledgeSnapshot.docs[0];

  let pledge: Pledge | undefined;

  if (!!pledgeRef) {
    const currentPledge = pledgeRef.data();

    verifySignature({
      address: currentPledge.ownerAddress,
      signature: params.signature,
      nonce: currentPledge.nonce.toString(),
    });

    const pledgeAttributes = putPledgeAttributes({
      pledge: params.pledge,
      currentFootprint: currentPledge.footprint,
    });

    await pledgeRef.ref.update(pledgeAttributes);

    pledge = pledgeAttributes
  } else {
    verifySignature({
      address: params.pageAddress,
      signature: params.signature,
      nonce: DEFAULT_NONCE,
    });

    const pledgeAttributes = createPledgeAttributes({ pledge: params.pledge });
    await pledgeCollectionRef.add(pledgeAttributes);

    pledge = pledgeAttributes;
  }

  if (!pledge) {
    throw new Error("Bad request");
  }

  return pledge;
};
