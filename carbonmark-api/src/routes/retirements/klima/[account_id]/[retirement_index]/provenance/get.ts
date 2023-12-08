import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
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
    /*
    const retirement = await getKlimaRetirement({
      ...pick(request.params, ["account_id", "retirement_index"]),
      ...pick(request.query, ["network"]),
    })
    console.debug(retirement)
    if (retirement == null) {
      return reply.notFound();
    }*/
    // FIXME: this is hardcoded for testing purposes until ...
    const hash =
      "0xfd59f524162d4ef2f7e5df69c5079ce394ecd6b9cf681d701d426cd221981b17";

    const sdk = gql_sdk(request.query.network);
    const retirementRecord = (
      await sdk.digital_carbon.getProvenanceRecords({ id: [hash] })
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
