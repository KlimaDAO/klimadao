import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { isNil } from "lodash";
import { gqlSdk } from "../utils/gqlSdk";

interface Params {
  id: string;
}

const schema = {
  summary: "Purchase details",
  description:
    "Retrieve the details of a purchase by its ID (transaction hash)",
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
  response: {
    "2xx": {
      description: "Successful response with listing details",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              id: { type: "string" },
              amount: { type: "string" },
              listing: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  totalAmountToSell: { type: "string" },
                  leftToSell: { type: "string" },
                  tokenAddress: { type: "string" },
                  active: { type: "boolean" },
                  deleted: { type: "boolean" },
                  batches: { type: "array", items: {} },
                  batchPrices: { type: "array", items: {} },
                  singleUnitPrice: { type: "string" },
                  createdAt: { type: "string" },
                  updatedAt: { type: "string" },
                  project: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      key: { type: "string" },
                      projectID: { type: "string" },
                      name: { type: "string" },
                      vintage: { type: "string" },
                      projectAddress: { type: "string" },
                      registry: { type: "string" },
                      methodology: { type: "string" },
                      projectType: { type: "string" },
                      region: { type: "string" },
                      category: {
                        type: "object",
                        properties: {
                          id: { type: "string" },
                        },
                      },
                      country: {
                        type: "object",
                        properties: {
                          id: { type: "string" },
                        },
                      },
                      updatedAt: { type: "string" },
                    },
                  },
                },
              },
              price: { type: "string" },
              timeStamp: { type: "string" },
              user: {
                type: "object",
                properties: {
                  id: { type: "string" },
                },
              },
            },
          },
        },
      },
      examples: [
        {
          id: "0xcad9383fba33aaad6256304ef7b103f3f00b21afbaffbbff14423bf074b699e8",
          amount: "1000000000000000000",
          listing: {
            id: "0x6",
            totalAmountToSell: "1030000000000000000",
            leftToSell: "0",
            tokenAddress: "0xb139c4cc9d20a3618e9a2268d73eff18c496b991",
            active: false,
            deleted: true,
            batches: [{}],
            batchPrices: [{}],
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
              category: {
                id: "Renewable Energy",
              },
              country: {
                id: "China",
              },
              updatedAt: "1684923108",
            },
          },
          price: "230000",
          timeStamp: "1679419884",
          user: {
            id: "0xd1a3699f2098ac92c2f4914979fcb22aba86d259",
          },
        },
      ],
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
