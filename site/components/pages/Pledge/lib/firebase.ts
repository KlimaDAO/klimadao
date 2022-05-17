import * as admin from "firebase-admin";
import { v4 as uuidv4 } from "uuid";

import { FIREBASE_ADMIN_CERT } from "lib/secrets";
import { Footprint, Pledge, putPledgeParams } from "../types";
import { verifySignature, DEFAULT_NONCE, generateNonce } from ".";

const initFirebaseAdmin = () => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(
        JSON.parse(FIREBASE_ADMIN_CERT as string)
      ),
    });
  }
  return admin.firestore();
};

const buildFootprint = (
  currentFootprint: Footprint[],
  newFootprint: number
): Footprint[] => {
  if (currentFootprint.at(-1)?.total === newFootprint) return currentFootprint;

  return [...currentFootprint, { timestamp: Date.now(), total: newFootprint }];
};

export const getPledgeByAddress = async (address: string): Promise<Pledge> => {
  const db = initFirebaseAdmin();
  const snapshot = await db
    .collection("pledges")
    .where("ownerAddress", "==", address)
    .get();

  const pledge = snapshot.docs[0]?.data();

  return pledge as Pledge;
};

export const findOrCreatePledge = async (
  params: putPledgeParams
): Promise<Pledge> => {
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
      updatedAt: Date.now(),
      nonce: generateNonce(),
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
      nonce: DEFAULT_NONCE,
    });

    const pledge = await pledgeCollectionRef.add({
      ...params.pledge,
      id: uuidv4(),
      nonce: generateNonce(),
      footprint: [{ total: params.pledge.footprint, timestamp: Date.now() }],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    data = await pledge.get().then((pledge) => pledge.data());
  }

  return data as Pledge;
};
