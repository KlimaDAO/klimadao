import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { pick } from "lodash";
import { getKlimaRetirement } from "../../../utils/helpers/retirements.utils";
import { getProfileByAddress } from "../../../utils/helpers/users.utils";
import { Params, Querystring, schema } from "./get.schema";

// Handler function for the "/retirements/klima/:account_id/:retirement_index" route
const handler = (fastify: FastifyInstance) =>
  async function (
    request: FastifyRequest<{
      Params: Params;
      Querystring: Querystring;
    }>,
    reply: FastifyReply
  ) {
    // Fetch retirement
    const retirement = await getKlimaRetirement({
      ...pick(request.params, ["account_id", "retirement_index"]),
      ...pick(request.query, ["network"]),
    });

    if (!retirement) {
      return reply.notFound();
    }

    // Add retiree profile information
    retirement.retireeProfile =
      (await getProfileByAddress({
        firebase: fastify.firebase,
        address: retirement.retiringAddress,
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
