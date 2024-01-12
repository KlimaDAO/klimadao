import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Purchase } from "../../models/Purchase.model";
import { gql_sdk } from "../../utils/gqlSdk";
import { Querystring, schema } from "./get.schema";
import { composePurchaseModel } from "./get.utils";

const handler = async (
  request: FastifyRequest<{
    Querystring: Querystring;
  }>,
  reply: FastifyReply
) => {
  const sdk = gql_sdk(request.query.network);
  const { purchases } = await sdk.marketplace.getPurchases();

  const response = purchases.map(composePurchaseModel);

  return reply.status(200).send(response);
};

export default (fastify: FastifyInstance) =>
  fastify.route<{
    Querystring: Querystring;
    Reply: Purchase[] | { error: string };
  }>({
    method: "GET",
    url: "/purchases",
    handler,
    schema,
  });
