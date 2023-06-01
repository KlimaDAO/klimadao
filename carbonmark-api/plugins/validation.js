'use strict'

const fp = require('fastify-plugin')

/**
 * A plugin that enables response validation for Fastify.
 *
 * @see https://github.com/fastify/fastify-response-validation
 */
module.exports = fp(async function (fastify, opts) {
  fastify.register(require('@fastify/response-validation'))
})
