import { Static } from "@sinclair/typebox";
import { utils } from "ethers";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { isNil } from "lodash";
import { Purchase } from "../../../models/Purchase.model";
import { CreditId } from "../../../utils/CreditId";
import { gql_sdk } from "../../../utils/gqlSdk";
import { fetchCarbonProject } from "../../../utils/helpers/carbonProjects.utils";
import { ParamsT, Querystring, schema } from "./get.schema";
import { isValidPurchaseId } from "./get.utils";

const handler = async (
  request: FastifyRequest<{
    Params: ParamsT;
    Querystring: Static<typeof Querystring>;
  }>,
  reply: FastifyReply
) => {
  if (!isValidPurchaseId(request.params.id)) {
    return reply.badRequest("Invalid purchase id: " + request.params.id);
  }
  const sdk = gql_sdk(request.query.network);
  const { purchase } = await sdk.marketplace.getPurchaseById(request.params);

  /** Handle the not found case */
  if (isNil(purchase)) {
    return reply.status(404).send({ error: "Purchase not found" });
  }

  const [standard, registryProjectId] = CreditId.splitProjectId(
    purchase.listing.project.key
  );
  const project = await fetchCarbonProject(sdk, {
    registry: standard,
    registryProjectId,
  });

  const response: Purchase = {
    id: purchase.id,
    amount: utils.formatUnits(purchase.amount, 18),
    price: utils.formatUnits(purchase.price, 6),
    listing: {
      id: purchase.listing.id,
      tokenAddress: purchase.listing.tokenAddress,
      seller: {
        id: purchase.listing.seller.id,
      },
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
