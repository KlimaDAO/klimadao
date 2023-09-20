import { Static } from "@sinclair/typebox";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Purchase } from "../../../models/Purchase.model";
import { CreditId } from "../../../utils/CreditId";
import { fetchCarbonProject } from "../../../utils/helpers/carbonProjects.utils";
import { schema } from "./get.schema";
import { getPurchaseById, isValidPurchaseId } from "./get.utils";

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
