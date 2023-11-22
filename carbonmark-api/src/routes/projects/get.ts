import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { mapValues, omit, sortBy } from "lodash";
import { split } from "lodash/fp";
import { Project } from "../../models/Project.model";
import { CreditId } from "../../utils/CreditId";
import { fetchAllICRProjects } from "../../utils/ICR/icr.utils";
import { gql_sdk } from "../../utils/gqlSdk";
import { fetchAllCarbonProjects } from "../../utils/helpers/cms.utils";
import { fetchAllPoolPrices } from "../../utils/helpers/fetchAllPoolPrices";
import { Querystring, schema } from "./get.schema";
import {
  CMSDataMap,
  ProjectDataMap,
  composeProjectEntries,
  getDefaultQueryArgs,
  isValidMarketplaceProject,
  isValidPoolProject,
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
    // @todo temp for testing. default is always polygon atm even when on mumbai
    // const network = request.query.network ?? "polygon";
    const network = "mumbai";
    const sdk = gql_sdk(network);
    //Transform the list params (category, country etc) provided so as to be an array of strings
    const args = mapValues(
      omit(request.query, "search", "expiresAfter"),
      split(",")
    );

    //Get the default args to return all results unless specified
    const allOptions = await getDefaultQueryArgs(sdk, fastify, network);
    const [
      marketplaceProjectsData,
      poolProjectsData,
      cmsProjects,
      poolPrices,
      IcrListProjects,
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
      fetchAllICRProjects(network),
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
      if (!isValidPoolProject(project)) {
        console.debug(
          `Project with id ${project.projectID} is considered invalid due to a balance of zero across all tokens and has been filtered`
        );
        return;
      }
      if (!CreditId.isValidProjectId(project.projectID)) {
        console.debug(
          `Project with id ${project.projectID} is considered to have an invalid id and has been filtered`
        );
        return;
      }
      const [standard, registryProjectId] = project.projectID.split("-");
      project.carbonCredits.forEach((credit) => {
        const { creditId: key } = new CreditId({
          standard,
          registryProjectId,
          vintage: credit.vintage.toString(),
        });
        ProjectMap.set(key, {
          /** We need to remove all other credits from this asset so that it is a one to one mapping of credit to project */
          poolProjectData: { ...project, carbonCredits: [credit] },
          key,
        });
      });
    });

    /** Assign valid marketplace projects to map */
    marketplaceProjectsData.projects.forEach((project) => {
      if (
        !isValidMarketplaceProject(project) ||
        !CreditId.isValidProjectId(project.key)
      ) {
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

    /** Compose all the data together to unique entries (unsorted) */
    const entries = composeProjectEntries(
      ProjectMap,
      CMSDataMap,
      poolPrices,
      IcrListProjects
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
