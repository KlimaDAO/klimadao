import { FastifyInstance } from "fastify";
import { isNil } from "lodash";
import { GetPurchasesByIdQuery } from "src/.generated/types/marketplace.types";
import { gqlSdk } from "../utils/gqlSdk";
import { PurchaseParams, PurchaseResponse, schema } from "./purchases.schema";

const routeHandler = (fastify: FastifyInstance) =>
  fastify.route<{
    Params: PurchaseParams;
    Reply: PurchaseResponse | { error: string };
  }>({
    method: "GET",
    url: "/purchases/:id",
    handler: async (request, reply) => {
      let response: GetPurchasesByIdQuery;
      try {
        response = await gqlSdk.marketplace.getPurchasesById(request.params);
      } catch (error) {
        // Return bad gateway and pass the error
        console.error(error);
        return reply.status(502).send(error?.message);
      }

      const data = response.purchases?.at(0);
      /** Handle the not found case */
      if (isNil(data)) {
        return reply.status(404).send({ error: "Purchase not found" });
      }

      const purchase: PurchaseResponse = {
        ...data,
        listing: {
          project: {
            ...data.listing.project,
            country: data.listing?.project?.country?.id || "",
          },
        },
      };

      return reply.status(200).send(purchase);
    },
    schema,
  });

export default routeHandler;
