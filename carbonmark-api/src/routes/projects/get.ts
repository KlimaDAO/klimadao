import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { mapValues, omit } from "lodash";
import { sortBy, split } from "lodash/fp";
import {
  FindProjectsQuery,
  FindProjectsQueryVariables,
} from "../../.generated/types/marketplace.types";
import { gqlSdk } from "../../utils/gqlSdk";
import {
  PoolPrice,
  fetchAllPoolPrices,
} from "../../utils/helpers/fetchAllPoolPrices";
import { getDefaultQueryArgs } from "./projects.utils";

import { FindCarbonOffsetsQuery } from "src/.generated/types/offsets.types";
import { CreditId } from "../../utils/CreditId";
import {
  CarbonProject,
  fetchAllCarbonProjects,
} from "../../utils/helpers/carbonProjects.utils";
import { ProjectEntry, schema } from "./get.schema";
import {
  CMSDataMap,
  ProjectDataMap,
  composeProjectEntries,
  isValidMarketplaceProject,
  isValidPoolProject,
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
  ): Promise<ProjectEntry[]> {
    let marketplaceProjectsData: FindProjectsQuery,
      poolProjectsData: FindCarbonOffsetsQuery,
      cmsProjects: CarbonProject[],
      poolPrices: Record<string, PoolPrice>;

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

    try {
      [marketplaceProjectsData, poolProjectsData, cmsProjects, poolPrices] =
        await Promise.all([
          gqlSdk.marketplace.findProjects(query),
          gqlSdk.offsets.findCarbonOffsets(query),
          fetchAllCarbonProjects(),
          fetchAllPoolPrices(),
        ]);
    } catch (error) {
      console.error(error);
      return reply.status(502).send(error?.message);
    }

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
    schema,
    handler: handler(fastify),
  });
};
