import admin from "firebase-admin";

import * as dotenv from "dotenv";
dotenv.config({ path: "../../../.vercel/.env.development.local" });

if (!process.env.FIREBASE_ADMIN_CERT) {
  throw new Error("Environment variable FIREBASE_ADMIN_CERT is undefined");
}

admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(process.env.FIREBASE_ADMIN_CERT)
  ),
});

const db = admin.firestore();

// get 19 ids
const getOriginalIds = async () => {
  const snapshot = await db.collection("users").get();
  const ids = snapshot.docs.map((doc) => doc.id);
  return ids;
};
// get 1000+ ids
const getTestingIds = async () => {
  const snapshot = await db.collection("usersTesting").get();
  const ids = snapshot.docs.map((doc) => doc.id);
  return ids;
};

const whereTest = async (ids: string[]) => {
  const start = Date.now();

  await Promise.all(
    ids.map((id) =>
      db.collection("usersTesting").where("address", "==", id).get()
    )
  );

  const end = Date.now();
  console.info(`whereTest duration: ${end - start} ms`);
};

const getInTest = async (ids: string[]) => {
  const chunkSize = 30;
  const chunks = [];

  for (let i = 0; i < ids.length; i += chunkSize) {
    chunks.push(ids.slice(i, i + chunkSize));
  }

  const start = Date.now();

  const snapshots = await Promise.all(chunks.map((chunk) => db.collection('usersTesting').where('address', 'in', chunk).get()) );

  console.info('snapshots.length', snapshots.length);
  const end = Date.now();
  console.info(`inTest duration: ${end - start} ms`);
};

const getAllTest = async (ids: string[]) => {
  const start = Date.now();

  await db.getAll(...ids.map((id) => db.collection("usersTesting").doc(id)));

  const end = Date.now();
  console.info(`getAllTest duration: ${end - start} ms`);
};

getOriginalIds()
  .then((ids) => {
    console.info("whereTests");
    return whereTest(ids);
  })
  .then(() => {
    return getTestingIds();
  })
  .then((ids) => {
    return whereTest(ids);
  })
  .then(() => {
    return getOriginalIds();
  })
  .then((ids) => {
    console.info("getInTests");
    return getInTest(ids);
  })
  .then(() => {
    return getTestingIds();
  })
  .then((ids) => {
    return getInTest(ids);
  })
  .then(() => {
    return getOriginalIds();
  })
  .then((ids) => {
    console.info("getAllTests");
    return getAllTest(ids);
  })
  .then(() => {
    return getTestingIds();
  })
  .then((ids) => {
    return getAllTest(ids);
  })
  .then(() => {
    console.info("All tests done.");
  })
  .catch((error) => {
    console.error("Error occurred during tests: ", error);
  });
