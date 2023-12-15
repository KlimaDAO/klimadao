import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { isEmpty } from "lodash";
import { gql_sdk } from "../../../../../../utils/gqlSdk";
import { formatRecord } from "../../../../../../utils/helpers/records.utils";
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

    // Finds the retirement using polygon-bridged-carbon. We can bypass this when we will have the trasaction hash in the Retire model of polygon-digital-carbon
    const retirement = await sdk.offsets.getKlimaRetirementTransactionId({
      address: request.params.account_id.toLowerCase(),
      index: BigInt(request.params.retirement_index).toString(),
    });
    if (isEmpty(retirement.klimaRetires)) {
      return reply.notFound();
    }

    const retirementRecord = (
      await sdk.digital_carbon.getProvenanceRecords({
        id: [retirement.klimaRetires[0].transaction.id],
      })
    ).provenanceRecords.at(0);

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
    url: "/retirements/klima/:account_id/:retirement_index/provenance",
    handler: handler(),
    schema,
  });