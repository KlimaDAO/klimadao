import cors from "@fastify/cors";
import fp from "fastify-plugin";

/**
 * This plugin integrates the CORS middleware into Fastify
 * to handle the CORS preflight requests and add CORS headers to responses.
 *
 * @see https://github.com/fastify/fastify-cors
 */
export default fp(async function (fastify) {
  await fastify.register(cors, {
    origin: true,
  });
});
