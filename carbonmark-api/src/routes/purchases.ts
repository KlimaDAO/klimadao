// purchases.ts
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { gqlSdk } from "src/utils/gqlSdk";

interface Params {
  id: string;
}

async function handler(
  request: FastifyRequest<{ Params: Params }>,
  reply: FastifyReply
): Promise<void> {
  const { purchases } = await gqlSdk.marketplace.getPurchasesById(
    request.params
  );

  return reply.send(JSON.stringify(purchases[0]));
}

export default async (fastify: FastifyInstance) =>
  await fastify.route({ method: "GET", url: "/purchases/:id", handler });
