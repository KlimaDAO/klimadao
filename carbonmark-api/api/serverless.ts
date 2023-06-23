/**
 * This file provides serverless capability within a Vercel environment
 * See: https://www.fastify.io/docs/latest/Guides/Serverless/#vercel
 */
import Fastify from "fastify";
import app from "../dist/src/app";

// Read the .env file.
import * as dotenv from "dotenv";
dotenv.config();

// Instantiate Fastify with some config
const fastify = Fastify({
  logger: false,
});

// Register your application as a normal plugin.
fastify.register(app);

module.exports = async (req, res) => {
  await fastify.ready();
  fastify.server.emit("request", req, res);
};
