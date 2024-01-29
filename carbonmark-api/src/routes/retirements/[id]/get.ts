import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { gql_sdk } from "../../../utils/gqlSdk";
import { formatRetirement } from "../../../utils/helpers/retirements.utils";
import { getFirestoreUserDoc } from "../../../utils/helpers/users.utils";
import { Params, Querystring, schema } from "./get.schema";

// Handler function for the "/retirements/klima/:id" route
const handler = (fastify: FastifyInstance) =>
  async function (
    request: FastifyRequest<{
      Params: Params;
      Querystring: Querystring;
    }>,
    reply: FastifyReply
  ) {
    // Fetch retirement
    const sdk = gql_sdk(request.query.network);
    const retirements = (
      await sdk.digital_carbon.getRetirementByHash({
        hash: request.params.id,
      })
    ).retires;

    if (retirements.length == 0) {
      return reply.notFound();
    }
    const retirement = formatRetirement(retirements[0]);

    // Add retiree profile information
    retirement.retireeProfile =
      (await getFirestoreUserDoc({
        docId: retirement.retiringAddress,
        firestore: fastify.firebase.firestore(),
      })) || undefined;

    return reply.send(JSON.stringify(retirement));
  };

export default async (fastify: FastifyInstance) =>
  await fastify.route({
    method: "GET",
    url: "/retirements/:id",
    handler: handler(fastify),
    schema,
  });
