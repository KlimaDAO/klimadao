import { Static } from "@sinclair/typebox";
import { isHexString } from "ethers-v6";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Purchase as MumbaiPurchase } from "../../../graphql/marketplaceMumbai.types";
import { NetworkParam } from "../../../models/NetworkParam.model";
import { Purchase } from "../../../models/Purchase.model";
import { CreditId } from "../../../utils/CreditId";
import { gqlSdk } from "../../../utils/gqlSdk";
import { fetchCarbonProject } from "../../../utils/helpers/carbonProjects.utils";
import { schema } from "./get.schema";

/** Purchase ids are a txn hash */
const isValidPurchaseId = (id?: string | null) => {
  if (!id) return false;
  return id.length === 66 && isHexString(id);
};

const getPurchaseById = async (params: {
  id: string | null;
  network?: NetworkParam;
}): Promise<Purchase | MumbaiPurchase | null> => {
  const graph =
    params.network === "mumbai" ? gqlSdk.marketplaceMumbai : gqlSdk.marketplace;
  const response = await graph.getPurchasesById({
    id: params.id,
  });
  return response.purchases?.at(0) || null;
};

const handler = async function (
  request: FastifyRequest<{
    Params: Static<typeof schema.params>;
    Querystring: Static<typeof schema.querystring>;
  }>,
  reply: FastifyReply
) {
  if (!isValidPurchaseId(request.params.id)) {
    return reply.badRequest("Invalid purchase id: " + request.params.id);
  }
  const purchase = await getPurchaseById({
    id: request.params.id,
    network: request.query.network,
  });

  /** Handle the not found case */
  if (!purchase) {
    return reply.notFound("Purchase not found");
  }
  const [standard, registryProjectId] = CreditId.splitProjectId(
    purchase.listing.project.key
  );
  const project = await fetchCarbonProject({
    registry: standard,
    registryProjectId,
  });

  const response: Purchase = {
    ...purchase,
    listing: {
      id: purchase.listing.id,
      project: {
        key: purchase.listing.project.key,
        vintage: purchase.listing.project.vintage,
        methodology: project.methodologies?.[0]?.id ?? "",
        name: project.name ?? "",
        projectID: registryProjectId,
        country: project.country ?? "",
      },
    },
  };

  return reply.status(200).send(response);
};

export default (fastify: FastifyInstance) =>
  fastify.route({
    method: "GET",
    url: "/purchases/:id",
    handler,
    schema,
  });
