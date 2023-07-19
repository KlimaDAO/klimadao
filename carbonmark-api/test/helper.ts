import Fastify, { FastifyInstance } from "fastify";
import nock from "nock";
import app from "../src/app";

export async function build() {
  let fastify: FastifyInstance = Fastify();
  await fastify.register(app);
  await fastify.ready();
  nock.cleanAll();
  nock.disableNetConnect();
  return fastify;
}
