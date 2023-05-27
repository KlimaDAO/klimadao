// purchases.ts
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import {
  GetPurchasesByIdDocument,
  GetPurchasesByIdQuery,
} from "../../.generated/types/marketplace.types";
import { executeGraphQLQuery } from "../utils/apollo-client";

interface Params {
  id: string;
}

async function handler(
  request: FastifyRequest<{ Params: Params }>,
  reply: FastifyReply
): Promise<void> {
  const { data } = await executeGraphQLQuery<GetPurchasesByIdQuery>(
    process.env.GRAPH_API_URL,
    GetPurchasesByIdDocument,
    request.params
  );

  return reply.send(JSON.stringify(data?.purchases[0]));
}

const purchases: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get("/purchases/:id", handler);
};

export default purchases;
