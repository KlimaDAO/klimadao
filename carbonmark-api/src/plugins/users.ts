import fp from "fastify-plugin";

type UserNonce = {
  walletAddress: string;
  nonce: string;
};

/**
 * Add a shared users object to the fastify instance
 */
export default fp(async (fastify) => {
  await fastify.decorate("users", {});
});

declare module "fastify" {
  export interface FastifyInstance {
    users: { [walletAddress: string]: UserNonce };
  }
}
