import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { compact, concat, curry, mapValues, min, omit } from "lodash";
import { filter, pipe, sortBy, split, uniqBy } from "lodash/fp";
import { FindProjectsQueryVariables } from "../../.generated/types/marketplace.types";
import { formatUSDC } from "../../utils/crypto.utils";
import { notNil } from "../../utils/functional.utils";
import { gqlSdk } from "../../utils/gqlSdk";
import { fetchAllCarbonProjects } from "../../utils/helpers/carbonProjects.utils";
import { fetchAllPoolPrices } from "../../utils/helpers/fetchAllPoolPrices";
import { isMatchingCmsProject } from "../../utils/helpers/utils";
import { isListingActive } from "../../utils/marketplace.utils";
import { schema } from "./get.schema";
import { GetProjectResponse } from "./projects.types";
import {
  buildProjectKey,
  composeCarbonmarkProject,
  composeOffsetProject,
  getDefaultQueryArgs,
  getOffsetTokenPrices,
} from "./projects.utils";

type Params = {
  country?: string;
  category?: string;
  search?: string;
  vintage?: string;
};

/**
 * This handler fetches data from multiple sources and builds a resulting list of Projects (& PoolProjects)
 * It does so by:
 * 1. Fetch Projects, CarbonOffsets, data from the CMS and token pricing
 * 2. Find the lowest price listed for each Project and CarbonOffset
 * 3. Assign the lowest price to each project
 * 4. Convert each CarbonOffset to a new PoolProject
 * 5. Return the combined collection of Projects & PoolProjects
 *
 * @param fastify
 * @returns
 */
const handler = (fastify: FastifyInstance) =>
  async function (
    request: FastifyRequest<{ Querystring: Params }>,
    reply: FastifyReply
  ): Promise<GetProjectResponse[]> {
    //Transform the list params (category, country etc) provided so as to be an array of strings
    const args = mapValues(omit(request.query, "search"), split(","));
    //Get the default args to return all results unless specified
    const defaultArgs = await getDefaultQueryArgs(fastify);

    //Build our query overriding default values
    const query: FindProjectsQueryVariables = {
      ...defaultArgs,
      ...args,
      search: request.query.search ?? "",
    };

    const [projectData, offsetData, cmsProjects, poolPrices] =
      await Promise.all([
        gqlSdk.marketplace.findProjects(query),
        gqlSdk.offsets.findCarbonOffsets(query),
        fetchAllCarbonProjects(),
        fetchAllPoolPrices(),
      ]);

    // ----- Carbonmark Listings ----- //
    const projects = projectData.projects.map((project) => {
      const cmsProject = cmsProjects.find(
        curry(isMatchingCmsProject)({
          projectId: project.projectID,
          registry: project.registry,
        })
      );

      const listingPrices = compact(project.listings)
        ?.filter(isListingActive)
        .map(({ singleUnitPrice }) => BigInt(singleUnitPrice));
      const lowestPrice = min(listingPrices) || BigInt(0);
      const formattedPrice = formatUSDC(lowestPrice);
      return composeCarbonmarkProject(project, cmsProject, formattedPrice);
    });

    // ----- Pool Listings ----- //
    const offsetProjects = offsetData.carbonOffsets.map((offset) => {
      const [registry, code] = offset.projectID.split("-");

      const cmsProject = cmsProjects.find(
        curry(isMatchingCmsProject)({ projectId: code, registry })
      );

      const priceStrings = getOffsetTokenPrices(offset, poolPrices);
      const tokenPrices = priceStrings.map((p) => Number(p));
      const lowestPrice = min(tokenPrices);

      return composeOffsetProject(offset, cmsProject, String(lowestPrice));
    });

    const validProject = ({ price }: GetProjectResponse) =>
      notNil(price) && parseFloat(price) > 0;

    // Remove invalid projects and duplicates selecting the project with the lowest price
    const filteredUniqueProjects: GetProjectResponse[] = pipe(
      concat,
      compact,
      filter(validProject),
      sortBy((prj) => Number(prj.price)),
      uniqBy(buildProjectKey)
    )(projects, offsetProjects);

    // Send the transformed projects array as a JSON string in the response
    return reply
      .status(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send(filteredUniqueProjects);
  };

export default async (fastify: FastifyInstance) => {
  await fastify.route({
    method: "GET",
    url: "/projects",
    schema,
    handler: handler(fastify),
  });
};
