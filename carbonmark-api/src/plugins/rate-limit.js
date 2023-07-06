const fp = require("fastify-plugin");
const rateLimiter = require("@fastify/rate-limit");

/**
 * This plugin adds rate limiting functionality to Fastify.
 * @see https://github.com/fastify/rate-limit
 */
module.exports = fp(async function (fastify) {
  await fastify.register(rateLimiter, {
    max: 100,
    timeWindow: "1 minute",
  });
});
