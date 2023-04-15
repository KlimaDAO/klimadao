"use strict";

const fp = require("fastify-plugin");
const fb = require("firebase-admin");
var admin = require("firebase-admin");

// Read the .env file.
require("dotenv").config({ path: "../.env.local" });

/**
 * This plugin adds the Firebase Admin SDK to Fastify
 * so we can easy use Firebase Auth, Firestore ect,
 *
 * @see https://github.com/now-ims/fastify-firebase
 */
module.exports = fp(async function (fastify, opts) {
  fastify.register(require("@now-ims/fastify-firebase"), {
    cert: admin.credential.cert(JSON.parse(process.env.FIREBASE_ADMIN_CERT)),
  });
});
