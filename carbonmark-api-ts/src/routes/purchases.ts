// purchases.ts
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {
  GetPurchasesByIdDocument,
  GetPurchasesByIdQuery,
} from "../graphql/generated/marketplace.types";
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

export default async function (fastify: FastifyInstance): Promise<void> {
  fastify.route({
    method: "GET",
    url: "/purchases/:id",
    handler,
  });
}
