import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { gql_sdk } from "../../../../utils/gqlSdk";
import { formatRecord } from "../../../../utils/helpers/records.utils";
import { Params, Querystring, schema } from "./get.schema";

// Handler function for the "/retirements/:id/provenance" route
const handler = () =>
  async function (
    request: FastifyRequest<{
      Params: Params;
      Querystring: Querystring;
    }>,
    reply: FastifyReply
  ) {
    const sdk = gql_sdk(request.query.network);
    const retirementRecord = (
      await sdk.digital_carbon.getProvenanceRecords({ id: [request.params.id] })
    ).provenanceRecords.at(0);
    console.debug(retirementRecord);

    if (retirementRecord == null) {
      return reply.notFound();
    }
    const records = [
      formatRecord(retirementRecord),
      ...retirementRecord.priorRecords.map(formatRecord),
    ];
    return reply.send(JSON.stringify(records));
  };

export default async (fastify: FastifyInstance) =>
  await fastify.route({
    method: "GET",
    url: "/retirements/:id/provenance",
    handler: handler(),
    schema,
  });
