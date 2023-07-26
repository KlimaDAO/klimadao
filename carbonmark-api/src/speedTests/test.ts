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

const whereEqualsTest = async (ids: string[]) => {
  const start = Date.now();

  await Promise.all(
    ids.map((id) =>
      db.collection("usersTesting").where("address", "==", id).get()
    )
  );

  const end = Date.now();
  console.info(`whereTest function duration: ${end - start} ms`);
};
const whereInSnapshotMap = new Map<string, FirebaseFirestore.DocumentData>();
const getAllSnapshotMap = new Map<string, FirebaseFirestore.DocumentData>();

// uncomment for Test 1
// function compareObjects(obj1: any, obj2: any) {
//   return JSON.stringify(obj1) === JSON.stringify(obj2);
// }

// function compareMaps(
//   map1: Map<string, FirebaseFirestore.DocumentData>,
//   map2: Map<string, FirebaseFirestore.DocumentData>
// ) {
//   if (map1.size !== map2.size) {
//     console.info("Size mismatch");
//     return false;
//   }

//   for (const [key, val] of map1) {
//     const testVal = map2.get(key);

//     if (testVal === undefined && !map2.has(key)) {
//       console.info("Key does not exist in map2:", key);
//       return false;
//     }
//     if (!compareObjects(val, testVal)) {
//       console.info("Value mismatch at key:", key);
//       return false;
//     }
//   }
//   return true;
// }

const whereInTest = async (ids: string[]) => {
  const chunkSize = 30;
  const chunks = [];

  for (let i = 0; i < ids.length; i += chunkSize) {
    chunks.push(ids.slice(i, i + chunkSize));
  }

  const start = Date.now();

  const callStart = Date.now();
  const snapshots = await Promise.all(
    chunks.map((chunk) => {
      return db.collection("usersTesting").where("address", "in", chunk).get();
    })
  );
  const callEnd = Date.now();
  console.info(`whereInCall duration: ${callEnd - callStart} ms`);

  snapshots.forEach((snapshot) => {
    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      if (!Object.prototype.hasOwnProperty.call(data, "createData")) {
        whereInSnapshotMap.set(doc.id, data);
      }
    });
  });

  const end = Date.now();
  console.info(`whereInTest function duration: ${end - start} ms`);
  return snapshots;
};

const getAllTest = async (ids: string[]) => {
  const start = Date.now();
  const callStart = Date.now();
  const snapshots = await db.getAll(
    ...ids.map((id) => db.collection("usersTesting").doc(id))
  );
  const callEnd = Date.now();
  console.info(`getAllCall duration: ${callEnd - callStart} ms`);

  snapshots.forEach((snapshot) => {
    const data = snapshot.data();
    if (data && !Object.prototype.hasOwnProperty.call(data, "createData")) {
      getAllSnapshotMap.set(snapshot.id, data);
    }
  });

  const end = Date.now();
  console.info(`getAllTest function duration: ${end - start} ms`);
  return snapshots;
};
// TEST 1
// compare whereIn vs getAll

// getOriginalIds()
//   .then((ids) => {
//     console.info("whereInTests");
//     return whereInTest(ids);
//   })
//   .then(() => {
//     return getOriginalIds();
//   })
//   .then((ids) => {
//     console.info("getAllTests");
//     return getAllTest(ids);
//   })
//   .then(() => {
//     const result = compareMaps(whereInSnapshotMap, getAllSnapshotMap);
//     console.info("Compare result: ", result);
//     console.info("All tests done.");
//   })
//   .catch((error) => {
//     console.error("Error occurred during tests: ", error);
//   });

// TEST 2
// compare whereIn vs getAll
getOriginalIds()
  .then((ids) => {
    console.info("whereEqualsTests");
    return whereEqualsTest(ids);
  })
  .then(() => {
    return getTestingIds();
  })
  .then((ids) => {
    return whereEqualsTest(ids);
  })
  .then(() => {
    return getOriginalIds();
  })
  .then((ids) => {
    console.info("____________");
    console.info("whereInTests");
    return whereInTest(ids);
  })
  .then(() => {
    return getTestingIds();
  })
  .then((ids) => {
    return whereInTest(ids);
  })
  .then(() => {
    return getOriginalIds();
  })
  .then((ids) => {
    console.info("____________");
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
    console.info("____________");
    console.info("All tests done.");
  })
  .catch((error) => {
    console.error("Error occurred during tests: ", error);
  });
