import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { isNil } from "lodash";
import { gqlSdk } from "../utils/gqlSdk";

interface Params {
  id: string;
}

const schema = {
  tags: ["purchases"],
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: {
        type: "string",
        description: "ID (transaction hash) of the purchase to retrieve",
        examples: [
          "0xcad9383fba33aaad6256304ef7b103f3f00b21afbaffbbff14423bf074b699e8",
        ],
      },
    },
  },
};

async function handler(
  request: FastifyRequest<{ Params: Params }>,
  reply: FastifyReply
): Promise<void> {
  let response;
  try {
    response = await gqlSdk.marketplace.getPurchasesById(request.params);
  } catch (error) {
    //Return bad gateway and pass the error
    console.error(error);
    return reply.status(502).send(error?.message);
  }

  const purchase = response.purchases?.at(0);

  /** Handle the not found case */
  if (isNil(purchase)) {
    return reply.status(404).send({ error: "Purchase not found" });
  }

  return reply.status(200).send(purchase);
}

export default async (fastify: FastifyInstance) =>
  await fastify.route({
    method: "GET",
    url: "/purchases/:id",
    handler,
    schema,
  });
