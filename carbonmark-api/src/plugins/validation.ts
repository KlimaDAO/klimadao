import responseValidation from "@fastify/response-validation";
import fp from "fastify-plugin";
/**
 * A plugin that enables response validation for Fastify.
 *
 * @see https://github.com/fastify/fastify-response-validation
 */
export default fp(async function (fastify) {
  await fastify.register(responseValidation, {
    // Uncomment the below if you are having issues with typebox validations to know which route is responsible
    // responseValidation: false,
  });
});
