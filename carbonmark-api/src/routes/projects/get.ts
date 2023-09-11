import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { mapValues, omit, sortBy } from "lodash";
import { split } from "lodash/fp";
import { FindDigitalCarbonProjectsQueryVariables } from "src/.generated/types/digitalCarbon.types";
import { FindProjectsQueryVariables } from "../../.generated/types/marketplace.types";
import { Project } from "../../models/Project.model";
import { CreditId } from "../../utils/CreditId";
import { gqlSdk } from "../../utils/gqlSdk";
import { fetchAllCarbonProjects } from "../../utils/helpers/carbonProjects.utils";
import { fetchAllPoolPrices } from "../../utils/helpers/fetchAllPoolPrices";
import { schema } from "./get.schema";
import {
  CMSDataMap,
  ProjectDataMap,
  composeProjectEntries,
  getDefaultQueryArgs,
  isValidMarketplaceProject,
  isValidPoolProject,
} from "./get.utils";

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
  ): Promise<Project[]> {
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

    // digital-carbon subgraph stores vintages as numbers instead of strings
    const digitalCarbonVintages = Array.isArray(defaultArgs.vintage)
      ? defaultArgs.vintage.map(Number)
      : [];

    // issue is making sure the vintages are the same format as before
    const subgraphQuery: FindDigitalCarbonProjectsQueryVariables = {
      ...defaultArgs,
      ...args,
      search: request.query.search ?? "",
      vintage: digitalCarbonVintages,
    };

    const [marketplaceProjectsData, poolProjectsData, cmsProjects, poolPrices] =
      await Promise.all([
        gqlSdk.marketplace.findProjects(query),
        gqlSdk.digital_carbon.findDigitalCarbonProjects(subgraphQuery), // fetch from digital-carbon subgraph
        fetchAllCarbonProjects(), // fetch all projects from cms
        fetchAllPoolPrices(),
      ]);

    const CMSDataMap: CMSDataMap = new Map();
    const ProjectDataMap: ProjectDataMap = new Map();

    cmsProjects.forEach((project) => {
      if (!CreditId.isValidProjectId(project.id)) return;
      const [standard, registryProjectId] = CreditId.splitProjectId(project.id); // type guard and capitalize
      CMSDataMap.set(`${standard}-${registryProjectId}`, project);
    });

    /** Assign valid pool projects to map */
    poolProjectsData.carbonProjects.forEach((project) => {
      if (
        !isValidPoolProject(project) ||
        !CreditId.isValidProjectId(project.projectID)
      ) {
        return;
      }

      const [standard, registryProjectId] = project.projectID.split("-");
      const { creditId: key } = new CreditId({
        standard,
        registryProjectId,
        vintage: project.carbonCredits[0].vintage.toString(),
      });
      ProjectDataMap.set(key, { poolProjectData: project, key });
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
      const existingData = ProjectDataMap.get(key);
      ProjectDataMap.set(key, {
        ...existingData,
        key,
        marketplaceProjectData: project,
      });
    });

    /** Compose all the data together to unique entries (unsorted) */
    const entries = composeProjectEntries(
      ProjectDataMap,
      CMSDataMap,
      poolPrices
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
