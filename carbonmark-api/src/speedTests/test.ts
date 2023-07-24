import admin from 'firebase-admin';


import * as dotenv from "dotenv";
dotenv.config({ path: "../../../.vercel/.env.development.local" });

if (!process.env.FIREBASE_ADMIN_CERT) {
    throw new Error("Environment variable FIREBASE_ADMIN_CERT is undefined");
  }

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_ADMIN_CERT))
});

const db = admin.firestore();

const getOriginalIds = async () => {
    const snapshot = await db.collection('users').get();
    const ids = snapshot.docs.map(doc => doc.id);
    return ids;
  };

  const getTestingIds = async () => {
    const snapshot = await db.collection('usersTesting').get();
    const ids = snapshot.docs.map(doc => doc.id);
    return ids;
  };


  const whereTest = async (ids: string[]) => {
    const start = Date.now();
  
    await Promise.all(ids.map(id => db.collection('usersTesting').where('address', '==', id).get()));
  
    const end = Date.now();
    console.info(`whereTest duration: ${end - start} ms`);
  };


  
  const getAllTest = async (ids: string[]) => {
    const start = Date.now();
  
    await db.getAll(...ids.map(id => db.collection('usersTesting').doc(id)));
  
    const end = Date.now();
    console.info(`getAllTest duration: ${end - start} ms`);
  };


  getOriginalIds().then(ids => {
    console.info("19 users return out of 1019");
    whereTest(ids).then(() => {
        getAllTest(ids).then(() => {
            getTestingIds().then(ids => {
                console.info("Return all in collection");
                whereTest(ids).then(() => {
                    getAllTest(ids);
                });
            });
        }); 
    });
});

  
  