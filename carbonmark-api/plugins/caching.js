'use strict'

const fp = require('fastify-plugin')
const fastifyCaching = require('fastify-lcache')

/**
 * This plugin adds the Firebase Admin SDK to Fastify 
 * so we can easy use Firebase Auth, Firestore ect,
 *
 * @see https://github.com/now-ims/fastify-firebase
 */
module.exports = fp(async function (fastify, opts) {
    fastify.register(fastifyCaching, { ttlInMinutes: 1 }
    )
})
