import fastifyJwt from "@fastify/jwt";
import fp from "fastify-plugin";
import { isNil } from "lodash";

const SECRET = process.env.JWT_SECRET;

if (isNil(SECRET)) {
  throw new Error(`Missing JWT_SECRET env`);
}

export default fp(async (fastify) => {
  await fastify.register(fastifyJwt, {
    secret: SECRET,
  });

  await fastify.decorate(
    "authenticate",
    async function (request, reply): Promise<void> {
      try {
        /** We need the ability to disable authentication when testing */
        if (!process.env.IGNORE_AUTH) {
          await request.jwtVerify();
        }
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
