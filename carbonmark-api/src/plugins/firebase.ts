import { getApps, initializeApp } from "firebase-admin/app";

import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import * as admin from "firebase-admin";

export default fp(async function (
  fastify: FastifyInstance,
  _: unknown,
  next: () => void
): Promise<void> {
  if (
    !process.env.FIREBASE_CERT_CLIENT_EMAIL ||
    !process.env.FIREBASE_CERT_PRIVATE_KEY ||
    !process.env.FIREBASE_CERT_PROJECT_ID
  ) {
    throw new Error("Missing FIREBASE_CERT env vars");
  }

  // it might already be initialized in the serverless environment
  if (getApps().length === 0) {
    initializeApp({
      credential: admin.credential.cert({
        clientEmail: process.env.FIREBASE_CERT_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_CERT_PRIVATE_KEY,
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
