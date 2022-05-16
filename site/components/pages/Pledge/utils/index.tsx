import * as admin from "firebase-admin";
import { v4 as uuidv4 } from "uuid";

import { putPledgeParams } from "queries/pledge";
import { verifySignature } from "lib/verifySignature";

import serviceAccount from "./firebaseServiceAccountFile.json";

export type Footprint = {
  timestamp: number;
  total: number;
};

const initFirebaseAdmin = () => {
  if (!admin.apps.length) {
    // the key is a string on vercel/env.local
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
  }
  return admin.firestore();
};

export default initFirebaseAdmin;

const buildFootprint = (
  currentFootprint: Footprint[],
  newFootprint: number
): Footprint[] => {
  if (currentFootprint.at(-1)?.total === newFootprint) return currentFootprint;

  return [...currentFootprint, { timestamp: Date.now(), total: newFootprint }];
};

export const getPledgeByAddress = async (address: string) => {
  const db = initFirebaseAdmin();
  const snapshot = await db
    .collection("pledges")
    .where("ownerAddress", "==", address)
    .get();

  const pledge = snapshot.docs[0]?.data();

  return pledge;
};

export const findOrCreatePledge = async (params: putPledgeParams) => {
  const db = initFirebaseAdmin();
  const pledgeCollectionRef = db.collection("pledges");

  const pledgeSnapshot = await pledgeCollectionRef
    .where("id", "==", params.pledge.id || "")
    .get();
  const pledgeRef = pledgeSnapshot.docs[0];

  let data;

  if (!!pledgeRef) {
    const currentPledge = pledgeRef.data();

    verifySignature({
      address: currentPledge.ownerAddress,
      signature: params.signature,
      nonce: currentPledge.nonce.toString(),
    });

    await pledgeRef.ref.update({
      ...params.pledge,
      nonce: Math.floor(Math.random() * 10000000),
      footprint: buildFootprint(
        currentPledge.footprint,
        params.pledge.footprint
      ),
    });

    const updatedPledge = await pledgeCollectionRef.doc(pledgeRef.id).get();
    data = updatedPledge.data();
  } else {
    verifySignature({
      address: params.pageAddress,
      signature: params.signature,
      nonce: "33",
    });

    const pledge = await pledgeCollectionRef.add({
      ...params.pledge,
      id: uuidv4(),
      nonce: Math.floor(Math.random() * 10000000),
      footprint: [{ total: params.pledge.footprint, timestamp: Date.now() }],
    });

    data = await pledge.get().then((pledge) => pledge.data());
  }

  return data;
};
