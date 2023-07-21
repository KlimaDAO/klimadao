import admin from 'firebase-admin';


import * as dotenv from "dotenv";
dotenv.config({ path: "../.vercel/.env.development.local" });

if (!process.env.FIREBASE_ADMIN_CERT) {
    throw new Error("Environment variable FIREBASE_ADMIN_CERT is undefined");
  }

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_ADMIN_CERT))
});

const db = admin.firestore();


const copyUsers = async () => {

    const snapshot = await db.collection('users').get();
    const docs = snapshot.docs;
  
    for (const doc of docs) {
      const data = doc.data();
  
      // Add the Ethereum address
      data.address = doc.id;
  

      await db.collection('usersTesting').doc(doc.id).set(data)
        .then(() => console.info(`Copied document with ID: ${doc.id}`))
        .catch((error) => console.error(`Error copying document with ID: ${doc.id}`, error));
    }
  };
  
  copyUsers();