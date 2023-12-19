import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreditId } from "../../../utils/CreditId";
import { gql_sdk } from "../../../utils/gqlSdk";
import { fetchCarbonProject } from "../../../utils/helpers/cms.utils";
import { fetchAllPoolPrices } from "../../../utils/helpers/fetchAllPoolPrices";
import { fetchMarketplaceListings } from "../../../utils/helpers/fetchMarketplaceListings";
import { formatTonnesForSubGraph } from "../../../utils/helpers/utils";
import { buildProjectEntry } from "../get.utils";
import { Params, Querystring, schema } from "./get.schema";

// Handler function for the "/projects/:id" route
const handler = (fastify: FastifyInstance) =>
  async function (
    request: FastifyRequest<{
      Params: Params;
      Querystring: Querystring;
    }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const sdk = gql_sdk(request.query.network);
    const {
      vintage,
      standard: registry,
      registryProjectId,
      projectId: key,
    } = new CreditId(id);
    let digitalCarbonCredits, listings, allPoolPrices, projectDetails;
    try {
      [ digitalCarbonCredits, allPoolPrices, [listings], projectDetails] = await Promise.all([
        sdk.digital_carbon.getProjectCredits({
          projectID: key,
          vintage: Number(vintage),
          minSupply: formatTonnesForSubGraph(request.query.minSupply || 0),
        }),
        fetchAllPoolPrices(sdk),
        fetchMarketplaceListings(sdk, {
          key,
          vintage,
          fastify,
          expiresAfter: request.query.expiresAfter,
          minSupply: request.query.minSupply || 0,
        }),
        fetchCarbonProject(sdk, {
          registry,
          registryProjectId,
        }),
      ]);
    } catch (error) {
      console.error(error);
      throw error;
    }

    if (!projectDetails) {
      // only render pages if project details exist (render even if there are no listings!)
      return reply.notFound();
    }
    
    const projectResponse = buildProjectEntry({
      vintage,
      listings,
      credits: digitalCarbonCredits?.carbonProjects.at(0)?.carbonCredits,
      projectDetails,
      allPoolPrices,
      network: request.query.network
    })

    return reply
      .header("Content-Type", "application/json; charset=utf-8")
      .send(JSON.stringify(projectResponse));
  };

export default async (fastify: FastifyInstance) =>
  await fastify.route({
    method: "GET",
    url: "/projects/:id",
    handler: handler(fastify),
    schema,
  });
