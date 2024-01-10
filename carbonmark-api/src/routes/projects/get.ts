import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { mapValues, omit, sortBy } from "lodash";
import { split } from "lodash/fp";
import { Project } from "../../models/Project.model";
import { CreditId } from "../../utils/CreditId";
import { gql_sdk } from "../../utils/gqlSdk";
import { fetchAllCarbonProjects } from "../../utils/helpers/cms.utils";
import { fetchAllPoolPrices } from "../../utils/helpers/fetchAllPoolPrices";
import { Querystring, schema } from "./get.schema";
import {
  CMSDataMap,
  ProjectDataMap,
  composeProjectEntries,
  getDefaultQueryArgs,
} from "./get.utils";

/**
 * This handler fetches data from multiple sources and builds a resulting list of Projects (& PoolProjects)
 * It does so by:
 * 1. Fetch Projects, CarbonOffsets, data from the CMS and token pricing
 * 2. Find the lowest price listed for each Project and CarbonOffset
 * 3. Assign the lowest price to each project
 * 4. Convert each CarbonOffset to a new PoolProject
 * 5. Return the combined collection of Projects & PoolProjects
 *
 * *Note*: This route will only return results for which there is an entry in the offsets graph
 *
 * @param fastify
 * @returns
 */
const handler = (fastify: FastifyInstance) =>
  async function (
    request: FastifyRequest<{ Querystring: Querystring }>,
    reply: FastifyReply
  ): Promise<Project[]> {
    const network = request.query.network || "polygon";
    const sdk = gql_sdk(network);
    //Transform the list params (category, country etc) provided so as to be an array of strings
    const args = mapValues(
      omit(request.query, "search", "expiresAfter", "minSupply"),
      split(",")
    );

    //Get the default args to return all results unless specified
    const allOptions = await getDefaultQueryArgs(sdk, fastify, network);

    const [
      marketplaceProjectsData,
      poolProjectsData,
      cmsProjects,
      allPoolPrices,
    ] = await Promise.all([
      sdk.marketplace.getProjects({
        search: request.query.search ?? "",
        category: args.category ?? allOptions.category,
        country: args.country ?? allOptions.country,
        vintage: args.vintage ?? allOptions.vintage,
        expiresAfter: request.query.expiresAfter ?? allOptions.expiresAfter,
      }),
      sdk.digital_carbon.findDigitalCarbonProjects({
        search: request.query.search ?? "",
        category: args.category ?? allOptions.category,
        country: args.country ?? allOptions.country,
        vintage: (args.vintage ?? allOptions.vintage).map(Number),
      }),
      fetchAllCarbonProjects(sdk),
      fetchAllPoolPrices(sdk),
    ]);

    const CMSDataMap: CMSDataMap = new Map();
    const ProjectMap: ProjectDataMap = new Map();

    cmsProjects.forEach((project) => {
      if (!CreditId.isValidProjectId(project.id)) return;
      const [standard, registryProjectId] = CreditId.splitProjectId(project.id); // type guard and capitalize
      CMSDataMap.set(`${standard}-${registryProjectId}`, project);
    });

    /** Assign valid pool projects to map */
    poolProjectsData.carbonProjects.forEach((project) => {
      if (!CreditId.isValidProjectId(project.projectID)) {
        console.debug(
          `Project with id ${project.projectID} is considered to have an invalid id and has been filtered`
        );
        return;
      }
      // Map the project credits to the correct map entry
      const [standard, registryProjectId] = project.projectID.split("-");
      project.carbonCredits.forEach((credit) => {
        // Discard credits with no pool balances
        if (credit.poolBalances.length == 0) return;

        const { creditId: key } = new CreditId({
          standard,
          registryProjectId,
          vintage: credit.vintage.toString(),
        });
        // Create the entry if does not exist
        if (!ProjectMap.has(key)) {
          ProjectMap.set(key, {
            poolProjectData: { ...project, carbonCredits: [] },
            key,
          });
        }
        // Add the carbon credit to the entry
        ProjectMap.get(key)?.poolProjectData?.carbonCredits.push(credit);
      });
    });

    /** Assign valid marketplace projects to map */
    marketplaceProjectsData.projects.forEach((project) => {
      if (!CreditId.isValidProjectId(project.key)) {
        return;
      }
      const [standard, registryProjectId] = project.key.split("-");
      const { creditId: key } = new CreditId({
        standard,
        registryProjectId,
        vintage: project.vintage,
      });
      const existingData = ProjectMap.get(key);
      ProjectMap.set(key, {
        ...existingData,
        key,
        marketplaceProjectData: project,
      });
    });
    const minSupply = request.query.minSupply || 0;

    /** Compose all the data together to unique entries (unsorted) */
    const entries = composeProjectEntries(
      ProjectMap,
      CMSDataMap,
      allPoolPrices,
      network,
      minSupply
    );

    const sortedEntries = sortBy(entries, (e) => Number(e.price));
    // Send the transformed projects array as a JSON string in the response
    return reply
      .status(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send(sortedEntries);
  };

export default async (fastify: FastifyInstance) => {
  await fastify.route({
    method: "GET",
    url: "/projects",
    handler: handler(fastify),
    schema,
  });
};
