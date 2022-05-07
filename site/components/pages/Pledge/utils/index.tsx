import * as admin from "firebase-admin";
// import { serverSecrets } from "lib/secrets";

const initFirebaseAdmin = () => {
  if (!admin.apps.length) {
    // the key is a string on vercel/env.local
    admin.initializeApp({
      credential: admin.credential
        .cert
        // serverSecrets.SECRET_FIREBASE_ADMIN_CERT
        (),
    });
  }
  const db = admin.firestore();
  const auth = admin.auth();
  return { db, auth };
};

export default initFirebaseAdmin;
