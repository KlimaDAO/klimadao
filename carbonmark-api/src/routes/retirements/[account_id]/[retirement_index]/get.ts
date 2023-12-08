import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { pick } from "lodash";
import { getKlimaRetirement } from "../../../../utils/helpers/retirements.utils";
import { Params, Querystring, schema } from "./get.schema";
// Handler function for the "/retirements/:account_id/:retirement_index" route
// FIXME: maybe it would be better to name that route "/retirements/klima/:account_id/:retirement_index"
const handler = () =>
  async function (
    request: FastifyRequest<{
      Params: Params;
      Querystring: Querystring;
    }>,
    reply: FastifyReply
  ) {
    const retirement = await getKlimaRetirement({
      ...pick(request.params, ["account_id", "retirement_index"]),
      ...pick(request.query, ["network"]),
    });

    if (!retirement) {
      return reply.notFound();
    }

    return reply.send(JSON.stringify(retirement));
  };

export default async (fastify: FastifyInstance) =>
  await fastify.route({
    method: "GET",
    url: "/retirements/:account_id/:retirement_index",
    handler: handler(),
    schema,
  });
