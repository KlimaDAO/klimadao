import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { gql_sdk } from "../../../../utils/gqlSdk";
import { formatRecord } from "../../../../utils/helpers/records.utils";
import { Params, Querystring, schema } from "./get.schema";
// Handler function for the "/projects/:id" route
const handler = () =>
  async function (
    request: FastifyRequest<{
      Params: Params;
      Querystring: Querystring;
    }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const sdk = gql_sdk(request.query.network);
    const record = (
      await sdk.digital_carbon.getProvenanceRecords({ id: [id] })
    ).provenanceRecords.at(0);
    console.debug(record);
    if (record == null) {
      return reply.notFound();
    }
    const records = [
      formatRecord(record),
      ...record.priorRecords.map(formatRecord),
    ];
    return reply.send(JSON.stringify(records));
  };

export default async (fastify: FastifyInstance) =>
  await fastify.route({
    method: "GET",
    url: "/records/:id",
    handler: handler(),
    schema,
  });
