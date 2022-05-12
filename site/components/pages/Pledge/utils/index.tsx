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

export const getPledgeByAddress = async (address: string) => {
  const db = initFirebaseAdmin();
  const snapshot = await db
    .collection("pledges")
    .where("ownerAddress", "==", address)
    .get();

  const pledge = snapshot.docs.at(0)?.data();

  return pledge;
};

const buildFootprint = (
  currentFootprint: Footprint[],
  newFootprint: number
): Footprint[] => {
  if (currentFootprint.at(-1)?.total === newFootprint) return currentFootprint;

  return [...currentFootprint, { timestamp: Date.now(), total: newFootprint }];
};

export const findOrCreatePledge = async (params: putPledgeParams) => {
  const db = initFirebaseAdmin();
  const pledgeCollectionRef = db.collection("pledges");

  const res = await pledgeCollectionRef.add({
    ...params.pledge,
    id: uuidv4(),
    footprint: [{ total: params.pledge.footprint, timestamp: Date.now() }],
  });

  const data = await res.get().then((pledge) => pledge.data());

  return data;

  // query pledge
  // getPledgeByAddress(params.pledge.id)
  // pledge = snapshot.docs[0].data()

  // new user
  // /pledge and create a pledg
  // pledge data and
  // compare pledger owner address with address from signer signature

  // use nonce to create signature
  // verify function -> compare address to pledge address
  // throw if not valid address
  // otherwise return true

  // save pledge to firebase
  // await userDocSnapshot.ref.set(partialUserDoc, { merge: true });

  const currentFootprint = pledgeObject.get("footprint");
  const footprint =
    params.pledge.objectId && currentFootprint
      ? buildFootprint(currentFootprint, params.pledge.footprint)
      : [{ timestamp: Date.now(), total: params.pledge.footprint }];

  // pledgeObject.set({ ...params.pledge, footprint });

  // return await pledgeObject.save(null, { useMasterKey: true });
};

// // const pledgeDocument = snapshot.docs[0];
// // const pledgeData = pledgeDocument.data();
// // await pledgeDocument.ref.set(newPledge, { merge: true });

// // create a new reference to a new doc w/ random id
// // const newPledgeRef = db.collection("pledges").doc();
