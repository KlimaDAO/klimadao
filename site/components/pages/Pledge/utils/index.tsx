import * as admin from "firebase-admin";
import { v4 as uuidv4 } from "uuid";

import { putPledgeParams } from "queries/pledge";

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

    // verify with nonce
    // throw if pledge does not belong to signer wallet

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
    // verify signature with nonce of 33
    // throw if page address does not belong match with signer wallet

    const pledge = await pledgeCollectionRef.add({
      ...params.pledge,
      id: uuidv4(),
      footprint: [{ total: params.pledge.footprint, timestamp: Date.now() }],
    });

    data = await pledge.get().then((pledge) => pledge.data());
  }

  return data;

  // use nonce to create signature
  // verify function -> compare address to pledge address
  // throw if not valid address
  // otherwise return true
};

// // const pledgeDocument = snapshot.docs[0];
// // const pledgeData = pledgeDocument.data();
// // await pledgeDocument.ref.set(newPledge, { merge: true });

// // create a new reference to a new doc w/ random id
// // const newPledgeRef = db.collection("pledges").doc();
