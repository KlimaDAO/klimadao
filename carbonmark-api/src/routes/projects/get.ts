import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { mapValues, omit, sortBy } from "lodash";
import { split } from "lodash/fp";
import { Project } from "../../models/Project.model";
import { CreditId, CreditIdentifier } from "../../utils/CreditId";
import { notNil } from "../../utils/functional.utils";
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
 * *Note*: This route will only return results for which there is an entry in the offsets graph
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
    const allOptions = await getDefaultQueryArgs(fastify);

    const [marketplaceProjectsData, poolProjectsData, cmsProjects, poolPrices] =
      await Promise.all([
        gqlSdk.marketplace.findProjects({
          vintage: args.vintage ?? allOptions.vintage,
          search: request.query.search ?? "",
        }),
        gqlSdk.offsets.findCarbonOffsets({
          category: args.category ?? allOptions.category,
          country: args.country ?? allOptions.country,
          vintage: args.vintage ?? allOptions.vintage,
          search: request.query.search ?? "",
        }),
        fetchAllCarbonProjects(),
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
    poolProjectsData.carbonOffsets.forEach((project) => {
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
        vintage: project.vintageYear,
      });
      ProjectDataMap.set(key, { poolProjectData: project, key });
    });

    /** Assign valid marketplace projects to map */
    marketplaceProjectsData.projects
      /**
       * Because marketplace projects do not contain country and category information we need to filter these
       * to match only those for which there is an offset project that was filtered previously by country or category
       * ... if country or category were provided in the query
       */
      .filter(({ id }) =>
        args.category || args.country
          ? // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- @todo Use CreditID
            notNil(ProjectDataMap.get(id as CreditIdentifier))
          : true
      )
      .forEach((project) => {
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
