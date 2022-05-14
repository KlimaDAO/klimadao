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

const getPledgeRef = async (id: string | undefined) => {
  const db = initFirebaseAdmin();
  const pledgeCollectionRef = db.collection("pledges");
  const pledgeSnapshot = await pledgeCollectionRef
    .where("id", "==", id || "")
    .get();

  if (!!pledgeSnapshot.docs[0]) {
    return pledgeSnapshot.docs[0];
  } else {
    return null;
  }
};

export const findOrCreatePledge = async (params: putPledgeParams) => {
  const db = initFirebaseAdmin();
  const pledgeCollectionRef = db.collection("pledges");

  const pledgeRef = await getPledgeRef(params.pledge.id);
  let data;

  if (pledgeRef) {
    const currentPledge = pledgeRef.data();

    // verify with nonce
    // throw if pledge does not belong to signer wallet

    pledgeRef.ref.update({
      ...params.pledge,
      nonce: Math.random(),
      footprint: buildFootprint(
        currentPledge.footprint,
        params.pledge.footprint
      ),
    });

    const updatedPledgeRef = await getPledgeRef(currentPledge.id);

    data = updatedPledgeRef?.data();
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
