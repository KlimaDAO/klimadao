import Fastify, { FastifyInstance } from "fastify";
import nock from "nock";
import app from "../src/app";
import { mockFirestore } from "./test.utils";

type Args = {
  allowNetworkRequest?: boolean;
  logger?: boolean;
};

beforeAll(() => mockFirestore());
afterAll(() => mockFirestore());

/**
 * This function is used to build and prepare a Fastify instance for use.
 * It also cleans up any network connections made by nock.
 */
export async function build(args?: Args): Promise<FastifyInstance> {
  try {
    const fastify = Fastify({ logger: args?.logger });
    await app(fastify, {});

    if (!args?.allowNetworkRequest) nock.disableNetConnect();
    nock.cleanAll();

    await fastify.ready();

    return fastify;
  } catch (e) {
    console.warn("Setup failed to build. Try npm run build?");
    console.error(e);
    throw e;
  }
}
