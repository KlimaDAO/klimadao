// purchases.ts
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import { gqlSdk } from "../utils/gqlSdk";

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

const purchases: FastifyPluginAsync = async (fastify): Promise<void> => {
  await fastify.get("/purchases/:id", handler);
};

export default purchases;
