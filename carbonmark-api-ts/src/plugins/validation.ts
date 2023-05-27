"use strict";

import responseValidation from "@fastify/response-validation";
import fp from "fastify-plugin";
/**
 * A plugin that enables response validation for Fastify.
 *
 * @see https://github.com/fastify/fastify-response-validation
 */
export default fp(async function (fastify) {
  fastify.register(responseValidation);
});
