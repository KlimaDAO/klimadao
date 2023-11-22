/**
 * This file provides serverless capability within a Vercel environment
 * See: https://www.fastify.io/docs/latest/Guides/Serverless/#vercel
 */
import Fastify from "fastify";
import packageJson from "../package.json";
import app from "../src/app";

// Read the .env file.
import * as dotenv from "dotenv";
dotenv.config();

// Instantiate Fastify with some config
const fastify = Fastify({
  logger: false,
});

console.warn("---------------------------------");
console.warn(process.env.SENTRY_DSN);
console.warn(process.env.VERCEL_GIT_COMMIT_REF);
console.warn(packageJson.version);
// Registry sentry plugin
fastify
  .register(import("@immobiliarelabs/fastify-sentry"), {
    dsn: process.env.SENTRY_DSN,
    environment: process.env.VERCEL_GIT_COMMIT_REF,
    release: packageJson.version,
  })
  .then(() => {
    // Register your application as a normal plugin.
    fastify.register(app);
  });

module.exports = async (req: unknown, res: unknown) => {
  await fastify.ready();
  fastify.server.emit("request", req, res);
};
