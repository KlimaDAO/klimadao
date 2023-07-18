import Fastify from "fastify";
import fp from "fastify-plugin";
import app from "../src/app";

export function build() {
  const fastify = Fastify();

  beforeEach(async () => {
    void fastify.register(fp(app));
    await fastify.ready();
  });

  afterEach(() => fastify.close());

  return fastify;
}
