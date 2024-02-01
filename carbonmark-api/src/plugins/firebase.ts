import { getApps, initializeApp } from "firebase-admin/app";

import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import * as admin from "firebase-admin";
import { difference } from "lodash";
import { notEmpty } from "../utils/functional.utils";

const ENV_VARS = [
  "FIREBASE_CERT_CLIENT_EMAIL",
  "FIREBASE_CERT_PRIVATE_KEY",
  "FIREBASE_CERT_PROJECT_ID",
];

const missingVars = difference(ENV_VARS, Object.keys(process.env));
// Confirm that all required env vars have been set
if (notEmpty(missingVars)) {
  throw new Error(`Missing FIREBASE_CERT env vars: ${missingVars}`);
}

export default fp(async function (fastify: FastifyInstance) {
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
});

export type FirebaseInstance = admin.app.App;
