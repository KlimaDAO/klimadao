import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { isNil } from "lodash";
import { Purchase } from "src/models/Purchase.model";
import { gql_sdk } from "../../../utils/gqlSdk";
import { composePurchaseModel, isValidPurchaseId } from "../get.utils";
import { Params, Querystring, schema } from "./get.schema";

const handler = async (
  request: FastifyRequest<{
    Params: Params;
    Querystring: Querystring;
  }>,
  reply: FastifyReply
) => {
  if (!isValidPurchaseId(request.params.id)) {
    return reply.badRequest("Invalid purchase id: " + request.params.id);
  }
  const network = request.query.network ?? "polygon";

  const sdk = gql_sdk(network);

  const { purchase } = await sdk.marketplace.getPurchaseById(request.params);
  /** Handle the not found case */
  if (isNil(purchase)) {
    return reply.status(404).send({ error: "Purchase not found" });
  }

  const response = composePurchaseModel(purchase);

  return reply.status(200).send(response);
};

export default (fastify: FastifyInstance) =>
  fastify.route<{
    Params: Params;
    Querystring: Querystring;
    Reply: Purchase | { error: string };
  }>({
    method: "GET",
    url: "/purchases/:id",
    handler,
    schema,
  });
