"use strict";

import fp from "fastify-plugin";
const fb = require("@now-ims/fastify-firebase");
const admin = require("firebase-admin");

// Read the .env file.
require("dotenv").config({ path: "../.env.local" });

/**
 * This plugin adds the Firebase Admin SDK to Fastify
 * so we can easy use Firebase Auth, Firestore ect,
 *
 * @see https://github.com/now-ims/fastify-firebase
 */
module.exports = fp(async function (fastify) {
  if (!process.env.FIREBASE_ADMIN_CERT) {
    throw new Error("Environment variable FIREBASE_ADMIN_CERT is undefined");
  }
  fastify.register(fb, {
    cert: admin.credential.cert(JSON.parse(process.env.FIREBASE_ADMIN_CERT)),
  });
});
