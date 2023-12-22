import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreditId } from "../../../utils/CreditId";
import { gql_sdk } from "../../../utils/gqlSdk";
import { fetchCarbonProject } from "../../../utils/helpers/cms.utils";
import { fetchAllPoolPrices } from "../../../utils/helpers/fetchAllPoolPrices";
import {
  addProfilesToListings,
  getActiveListings,
} from "../../../utils/helpers/listings.utils";
import { formatListings } from "../../../utils/marketplace.utils";
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
    const creditId = new CreditId(id);
    const {
      vintage,
      standard: registry,
      registryProjectId,
      projectId: key,
    } = creditId;
    let digitalCarbonCredits, marketplaceProject, allPoolPrices, cmsProject;
    try {
      [
        digitalCarbonCredits,
        allPoolPrices,
        { project: marketplaceProject },
        cmsProject,
      ] = await Promise.all([
        sdk.digital_carbon.getProjectCredits({
          projectID: key,
          vintage: Number(vintage),
        }),
        fetchAllPoolPrices(sdk),
        sdk.marketplace.getProjectById({
          projectId: key + "-" + vintage,
          expiresAfter:
            request.query.expiresAfter ?? String(Math.floor(Date.now() / 1000)),
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

    const minSupply = request.query.minSupply || 0;

    if (!cmsProject) {
      // only render pages if project details exist (render even if there are no listings!)
      return reply.notFound();
    }
    const poolProject = digitalCarbonCredits?.carbonProjects?.at(0);

    const project = buildProjectEntry({
      creditId,
      marketplaceProject,
      poolProject,
      cmsProject,
      allPoolPrices,
      network,
      minSupply,
    });
    // Override listing with profiles
    const listings = getActiveListings(
      formatListings(marketplaceProject?.listings || [])
    );
    const listingsWithProfiles = await addProfilesToListings(listings, fastify);
    const detailedProject = {
      ...project,
      listings: listingsWithProfiles,
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
