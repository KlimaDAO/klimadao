import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { gql_sdk } from "../../../../utils/gqlSdk";
import { formatRecord } from "../../../../utils/helpers/records.utils";
import { Params, Querystring } from "../get.schema";
import { schema } from "./get.schema";

// Handler function for the "/retirements/klima/:account_id/:retirement_index/provenance" route
const handler = () =>
  async function (
    request: FastifyRequest<{
      Params: Params;
      Querystring: Querystring;
    }>,
    reply: FastifyReply
  ) {
    const sdk = gql_sdk(request.query.network);

    const retirementRecord =
      await sdk.digital_carbon.getProvenanceRecordsByHash({
        hash: request.params.id,
      });
    if (retirementRecord.retires.length === 0 || !retirementRecord.retires[0]) {
      return reply.notFound();
    }

    if (!retirementRecord.retires[0].provenance) {
      return reply.notFound();
    }
    const registry = retirementRecord.retires[0].credit.project.registry;

    const lastRecord = { ...retirementRecord.retires[0].provenance };

    const priorRecords =
      retirementRecord.retires[0].provenance?.priorRecords ?? [];

    const records = [
      formatRecord(lastRecord, registry),
      ...priorRecords.map((record) => formatRecord(record, registry)),
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
