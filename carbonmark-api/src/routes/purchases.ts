import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { isNil } from "lodash";
import { gqlSdk } from "../utils/gqlSdk";

interface Params {
  id: string;
}

const example = {
  id: "0xcad9383fba33aaad6256304ef7b103f3f00b21afbaffbbff14423bf074b699e8",
  amount: "1000000000000000000",
  listing: {
    id: "0x6",
    totalAmountToSell: "1030000000000000000",
    leftToSell: "0",
    tokenAddress: "0xb139c4cc9d20a3618e9a2268d73eff18c496b991",
    active: false,
    deleted: true,
    batches: [],
    batchPrices: [],
    singleUnitPrice: "230000",
    createdAt: "1679158382",
    updatedAt: "1687858292",
    project: {
      id: "0x0",
      key: "VCS-191",
      projectID: "191",
      name: "4×50 MW Dayingjiang- 3 Hydropower Project Phases 1&2",
      vintage: "2008",
      projectAddress: "0xb139c4cc9d20a3618e9a2268d73eff18c496b991",
      registry: "VCS",
      methodology: "ACM0002",
      projectType: "",
      region: "China",
      category: { id: "Renewable Energy" },
      country: { id: "China" },
      updatedAt: "1684923108",
    },
  },
  price: "230000",
  timeStamp: "1679419884",
  user: { id: "0xd1a3699f2098ac92c2f4914979fcb22aba86d259" },
};

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
