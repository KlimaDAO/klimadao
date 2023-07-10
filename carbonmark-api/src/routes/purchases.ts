// purchases.ts
import { gqlSdk } from "@/utils/gqlSdk";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

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
