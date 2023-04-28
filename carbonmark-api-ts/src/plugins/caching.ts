"use strict";

import fastifyCaching from "fastify-lcache";
import fp from "fastify-plugin";

/**
 * This plugin adds https://github.com/denbon05/fastify-lcache
 *
 * @see https://github.com/denbon05/fastify-lcache
 */
module.exports = fp(async function (fastify) {
  fastify.register(fastifyCaching, { ttlInMinutes: 1 });
});

// declare module "fastify" {
//   export interface FastifyInstance {
//     lcache(): string;
//   }
// }
