import fb from "@now-ims/fastify-firebase";
import fp from "fastify-plugin";
import * as admin from "firebase-admin";

// Read the .env file.
import * as dotenv from "dotenv";
dotenv.config({ path: "../.env.local" });

/**
 * This plugin adds the Firebase Admin SDK to Fastify
 * so we can easy use Firebase Auth, Firestore ect,
 *
 * @see https://github.com/now-ims/fastify-firebase
 */
export default fp(async function (fastify) {
  if (!process.env.FIREBASE_ADMIN_CERT) {
    throw new Error("Environment variable FIREBASE_ADMIN_CERT is undefined");
  }
  await fastify.register(fb, {
    cert: admin.credential.cert(JSON.parse(process.env.FIREBASE_ADMIN_CERT)),
  });
});

export type FirebaseInstance = admin.app.App;

declare module "fastify" {
  export interface FastifyInstance {
    firebase: FirebaseInstance;
  }
}
