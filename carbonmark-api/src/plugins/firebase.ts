import { cert, getApps, initializeApp } from "firebase-admin/app";

import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import * as admin from "firebase-admin";

// Create a Fastify plugin
export default fp(async function (
  fastify: FastifyInstance,
  _: unknown,
  next: () => void
): Promise<void> {
  if (!process.env.FIREBASE_ADMIN_CERT) {
    throw new Error("Environment variable FIREBASE_ADMIN_CERT is undefined");
  }

  // it might already be initialized in the serverless environment
  if (getApps().length === 0) {
    initializeApp({
      credential: cert(JSON.parse(process.env.FIREBASE_ADMIN_CERT)), // the key is a string on vercel/env.local
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
