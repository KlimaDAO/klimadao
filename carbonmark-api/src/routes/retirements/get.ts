import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { GraphQLClient } from "graphql-request";
import gql from "graphql-tag";

import {
  AllRetirementsQuery,
  CarbonCreditFragmentFragmentDoc,
  KlimaRetire_Filter,
  RetireFragmentFragmentDoc,
  Retire_Filter,
} from "../../.generated/types/digitalCarbon.types";
import { GRAPH_URLS } from "../../app.constants";
import { gqlWhereFragment } from "../../utils/helpers/utils";
import { Querystring, schema } from "./get.schema";

type FilterItem = string | number | null;
type FilterRecords =
  | { [k: string]: FilterItem | FilterItem[] | Filter }
  | FilterItem
  | FilterItem[]
  | null;
type Filter = FilterRecords | FilterRecords[];

// Handler function for the "/retirements/klima/:account_id/:retirement_index" route
const handler = () =>
  async function (
    request: FastifyRequest<{
      Querystring: Querystring;
    }>,
    reply: FastifyReply
  ) {
    const network = request.query.network || "polygon";
    const graph_urls = GRAPH_URLS[network];
    const client = new GraphQLClient(graph_urls.digitalCarbon);

    // Build filter
    const retireFilter: Partial<
      Omit<Retire_Filter, "klimaRetire_"> & {
        klimaRetire_: Partial<KlimaRetire_Filter>;
      }
    > = {};
    const klimaRetireFilter: Partial<KlimaRetire_Filter> | undefined = request
      .query.retirement_index
      ? {
          index: String(request.query.retirement_index),
        }
      : undefined;
    retireFilter.klimaRetire_ = klimaRetireFilter;
    retireFilter.beneficiaryAddress = request.query.beneficiaryAddress;

    // Build GQL query
    const SearchKlimaRetirementDocument = gql`
    query searchRetirements {
      retires(where: ${gqlWhereFragment(retireFilter)}) {
        ...RetireFragment
        credit {
          ...CarbonCreditFragment
        }
      }
    }
    ${RetireFragmentFragmentDoc}
    ${CarbonCreditFragmentFragmentDoc}`;

    const retirements = await client.request<AllRetirementsQuery>(
      SearchKlimaRetirementDocument
    );

    return reply.send(JSON.stringify(retirements));
  };

export default async (fastify: FastifyInstance) =>
  await fastify.route({
    method: "GET",
    url: "/retirements",
    handler: handler(),
    schema,
  });
