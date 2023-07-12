import fastifyJwt from "@fastify/jwt";
import fp from "fastify-plugin";

export default fp(async (fastify) => {
  await fastify.register(fastifyJwt, {
    secret: "supersecret", //@todo use a real secret
  });

  await fastify.decorate(
    "authenticate",
    async function (request, reply): Promise<void> {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.send(err);
      }
    }
  );
});

declare module "fastify" {
  export interface FastifyInstance {
    authenticate(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  }
}
