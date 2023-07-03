const fp = require("fastify-plugin");
const cors = require("@fastify/cors");

/** True if local development (not preview deployment) */
const IS_LOCAL_DEVELOPMENT = process.env.VERCEL_ENV === "development";

/**
 * This plugin integrates the CORS middleware into Fastify
 * to handle the CORS preflight requests and add CORS headers to responses.
 *
 * @see https://github.com/fastify/fastify-cors
 */
module.exports = fp(async function (fastify) {
  fastify.register(cors, {
    origin: IS_LOCAL_DEVELOPMENT,
  });
});
