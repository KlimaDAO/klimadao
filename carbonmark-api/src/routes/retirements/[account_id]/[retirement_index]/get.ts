import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { gql_sdk } from "../../../../utils/gqlSdk";
import { formatRetirement } from "../../../../utils/helpers/retirements.utils";
import { Params, Querystring, schema } from "./get.schema";

// Handler function for the "/retirements/:account_id/:retirement_index" route
const handler = () =>
  async function (
    request: FastifyRequest<{
      Params: Params;
      Querystring: Querystring;
    }>,
    reply: FastifyReply
  ) {
    const { account_id, retirement_index } = request.params;

    // FIXME: temporary: this is not the correct way to compute this.
    const id = `${account_id}0${retirement_index}000000`;

    const sdk = gql_sdk(request.query.network);
    console.debug(id);
    const retirement = await sdk.digital_carbon.getRetirement({ id: id });
    if (!retirement.klimaRetire) {
      return reply.notFound();
    }

    return reply.send(JSON.stringify(formatRetirement(retirement.klimaRetire)));
  };

export default async (fastify: FastifyInstance) =>
  await fastify.route({
    method: "GET",
    url: "/retirements/:account_id/:retirement_index",
    handler: handler(),
    schema,
  });
