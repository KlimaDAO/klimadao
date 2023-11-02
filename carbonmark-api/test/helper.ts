import Fastify, { FastifyInstance } from "fastify";
import nock from "nock";
import app from "../src/app";
type Args = {
  allowNetworkRequest?: boolean;
  logger?: boolean;
};
let fastify: FastifyInstance;

afterEach(async () => {
  await fastify?.close();
});

/**
 * This function is used to build and prepare a Fastify instance for use.
 * It also cleans up any network connections made by nock.
 *
 * @returns {FastifyInstance} The prepared Fastify instance.
 */
export async function build(args?: Args) {
  try {
    // Create a new Fastify instance
    fastify = Fastify({ logger: args?.logger });

    // Register the application with the Fastify instance
    await fastify.register(app);

    // Wait for Fastify to be ready
    await fastify.ready();

    // Clean all nocks
    nock.cleanAll();

    // Disable all network connections made by nock
    if (!args?.allowNetworkRequest) nock.disableNetConnect();

    // Return the prepared Fastify instance
    return fastify;
  } catch (e) {
    console.warn("Failed to build. Try npm run build?");
    console.error(e);
    throw e;
  }
}
