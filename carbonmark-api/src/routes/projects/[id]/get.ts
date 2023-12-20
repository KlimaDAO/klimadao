import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreditId } from "../../../utils/CreditId";
import { gql_sdk } from "../../../utils/gqlSdk";
import { fetchCarbonProject } from "../../../utils/helpers/cms.utils";
import { fetchAllPoolPrices } from "../../../utils/helpers/fetchAllPoolPrices";
import { addProfilesToListings } from "../../../utils/helpers/fetchMarketplaceListings";
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
    const network = request.query.network || "polygon";
    const sdk = gql_sdk(network);
    const {
      vintage,
      standard: registry,
      registryProjectId,
      projectId: key,
    } = new CreditId(id);
    let digitalCarbonCredits, marketplaceProject, allPoolPrices, projectDetails;
    try {
      [
        digitalCarbonCredits,
        allPoolPrices,
        { project: marketplaceProject },
        projectDetails,
      ] = await Promise.all([
        sdk.digital_carbon.getProjectCredits({
          projectID: key,
          vintage: Number(vintage),
          minSupply: formatTonnesForSubGraph(request.query.minSupply || 0),
        }),
        fetchAllPoolPrices(sdk),
        sdk.marketplace.getProjectById({
          projectId: key + "-" + vintage,
          expiresAfter:
            request.query.expiresAfter ?? String(Math.floor(Date.now() / 1000)),
          minSupply: formatTonnesForSubGraph(request.query.minSupply),
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
    const listings = marketplaceProject?.listings || [];
    const listingsWithProfiles = await addProfilesToListings(listings, fastify);

    if (!projectDetails) {
      // only render pages if project details exist (render even if there are no listings!)
      return reply.notFound();
    }
    const credits = digitalCarbonCredits?.carbonProjects.at(0)?.carbonCredits;

    const project = buildProjectEntry({
      vintage,
      listings,
      credits,
      projectDetails,
      allPoolPrices,
      network,
    });
    const detailedProject = {
      ...project,
      listing: listingsWithProfiles,
    };

    return reply
      .header("Content-Type", "application/json; charset=utf-8")
      .send(JSON.stringify(detailedProject));
  };

export default async (fastify: FastifyInstance) =>
  await fastify.route({
    method: "GET",
    url: "/projects/:id",
    handler: handler(fastify),
    schema,
  });
