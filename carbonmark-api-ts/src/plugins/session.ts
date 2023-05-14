"use strict";

import fc from "@fastify/cookie";
import fs from "@mgcrea/fastify-session";
import fp from "fastify-plugin";

const SESSION_SECRET = "env_key"; //@todo use a real key here
const SESSION_TTL = 864e3; // 1 day in seconds

export default fp(async function (fastify: any) {
  fastify.register(fc);
  fastify.register(fs, {
    secret: SESSION_SECRET,
    cookie: { maxAge: SESSION_TTL },
  });
});

declare module "fastify" {
  interface Session {
    token: string;
  }
}
