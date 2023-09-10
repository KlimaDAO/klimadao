import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { mapValues, omit } from "lodash";
import { split } from "lodash/fp";
import {
  FindProjectsQuery,
  FindProjectsQueryVariables,
} from "../../.generated/types/marketplace.types";
import { gqlSdk } from "../../utils/gqlSdk";
import {
  PoolPrice,
  fetchAllPoolPrices,
} from "../../utils/helpers/fetchAllPoolPrices";
import { buildCarbonmarkProjects, getDefaultQueryArgs } from "./projects.utils";

import { FindCarbonOffsetsQuery } from "../../.generated/types/offsets.types";
import {
  CarbonProject,
  fetchAllCarbonProjects,
} from "../../utils/helpers/carbonProjects.utils";
import { ProjectEntry, schema } from "./get.schema";

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

    const projects = buildCarbonmarkProjects(
      cmsProjects,
      poolProjectsData.carbonOffsets,
      marketplaceProjectsData.projects,
      poolPrices
    );

    // Send the transformed projects array as a JSON string in the response
    return reply
      .status(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send(projects);
  };

export default async (fastify: FastifyInstance) => {
  await fastify.route({
    method: "GET",
    url: "/projects",
    schema,
    handler: handler(fastify),
  });
};
