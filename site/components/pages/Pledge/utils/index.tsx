import * as admin from "firebase-admin";
// import { serverSecrets } from "lib/secrets";

const initFirebaseAdmin = () => {
  if (!admin.apps.length) {
    // the key is a string on vercel/env.local
    admin.initializeApp({
      credential: admin.credential
        .cert
        // process.env.SECRET_FIREBASE_ADMIN_CERT
        (),
    });
  }

  return admin.firestore();
};

export default initFirebaseAdmin;

// export const getPledgeByAddress = async (address: string) => {
//   const { db } = initFirebaseAdmin();
//   const snapshot = await db
//       .collection("pledges")
//       .where("beneficiary_address", "==", address)
//       .get();

//   return //pledge
// };

// /pledge/<address>/<name>

export const findOrCreatePledge = async (params: putPledgeParams) => {
  await MoralisClient;

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

  // const currentFootprint = pledgeObject.get("footprint");
  // const footprint =
  //   params.pledge.objectId && currentFootprint
  //     ? buildFootprint(currentFootprint, params.pledge.footprint)
  //     : [{ timestamp: Date.now(), total: params.pledge.footprint }];

  // pledgeObject.set({ ...params.pledge, footprint });

  // return await pledgeObject.save(null, { useMasterKey: true });
};

// const pledgeDocument = snapshot.docs[0];
// const pledgeData = pledgeDocument.data();
// await pledgeDocument.ref.set(newPledge, { merge: true });

// create a new reference to a new doc w/ random id
// const newPledgeRef = db.collection("pledges").doc();
