import { FastifyInstance } from "fastify";
import { map } from "lodash/fp";
import {
  FindProjectsQueryVariables,
  Project,
} from "src/.generated/types/marketplace.types";
import { CarbonOffset } from "src/.generated/types/offsets.types";
import { extract } from "../../utils/functional.utils";
import {
  getAllCategories,
  getAllCountries,
  getAllVintages,
} from "../../utils/helpers/utils";

/**
 * Build a default FindProjectsQueryVariables object for searching
 * via findProjects
 * @param fastify
 * @returns
 */
export const getDefaultQueryArgs = async (
  fastify: FastifyInstance
): Promise<FindProjectsQueryVariables> => {
  //Fetch all possible parameter values
  const [category, country, vintage] = await Promise.all([
    getAllCategories(fastify).then(map(extract("id"))),
    getAllCountries(fastify).then(map(extract("id"))),
    getAllVintages(fastify),
  ]);
  return {
    category,
    country,
    vintage,
    search: "",
  };
};

/** Is the offset project the same project as sourced from carbonmark */
export const isMatchingProject = (
  offset: Partial<CarbonOffset>,
  project: Project
) =>
  offset.projectID === project.registry + "-" + project.projectID &&
  offset.vintageYear === project.vintage;
