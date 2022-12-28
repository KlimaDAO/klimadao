'use strict'

const fp = require('fastify-plugin')
const fb = require('firebase-admin')
var serviceAccount = require("../serviceAccountKey.json");
var admin = require("firebase-admin");

/**
 * This plugin adds the Firebase Admin SDK to Fastify 
 * so we can easy use Firebase Auth, Firestore ect,
 *
 * @see https://github.com/now-ims/fastify-firebase
 */
module.exports = fp(async function (fastify, opts) {
  fastify.register(require('@now-ims/fastify-firebase'), {
     cert: admin.credential.cert(serviceAccount),
    
    errorHandler: false,
    name: process.env.FIREBASE_PROJECT_NAME,
    apiKey: process.env.FIREBASE_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  })
})
