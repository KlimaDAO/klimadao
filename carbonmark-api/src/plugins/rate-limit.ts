import rateLimiter from "@fastify/rate-limit";
import fp from "fastify-plugin";

/**
 * This plugin adds rate limiting functionality to Fastify.
 * @see https://github.com/fastify/rate-limit
 */
export default fp(async function (fastify) {
  await fastify.register(rateLimiter, {
    max: 100,
    timeWindow: "1 minute",
  });
});
