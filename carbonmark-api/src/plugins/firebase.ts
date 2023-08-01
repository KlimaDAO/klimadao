import { getApps, initializeApp } from "firebase-admin/app";

import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import * as admin from "firebase-admin";
import { isNil, pick } from "lodash";

const ENV_VARS = [
  "FIREBASE_CERT_CLIENT_EMAIL",
  "FIREBASE_CERT_PRIVATE_KEY",
  "FIREBASE_CERT_PROJECT_ID",
];

export default fp(async function (
  fastify: FastifyInstance,
  _: unknown,
  next: () => void
): Promise<void> {
  // Confirm that all required env vars have been set
  if (Object.values(pick(process.env, ENV_VARS)).some(isNil)) {
    throw new Error("Missing FIREBASE_CERT env vars");
  }

  // Only initialise if necessary
  if (getApps().length === 0) {
    initializeApp({
      credential: admin.credential.cert({
        clientEmail: process.env.FIREBASE_CERT_CLIENT_EMAIL,
        // We need to format escaped \n chars
        // See: https://stackoverflow.com/questions/50299329/node-js-firebase-service-account-private-key-wont-parse
        privateKey: process.env.FIREBASE_CERT_PRIVATE_KEY?.replace(
          /\\n/g,
          "\n"
        ),
        projectId: process.env.FIREBASE_CERT_PROJECT_ID,
      }),
    });
  }

  await fastify.decorate("firebase", admin.app());
  next();
});

export type FirebaseInstance = admin.app.App;

declare module "fastify" {
  export interface FastifyInstance {
    firebase: FirebaseInstance;
  }
}
