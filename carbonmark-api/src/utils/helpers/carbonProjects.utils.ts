import { compact, merge } from "lodash";
import { compose, filter, pipe } from "lodash/fp";
import {
  Project,
  ProjectContent,
} from "src/.generated/types/carbonProjects.types";
import { SetRequired } from "../../../../lib/utils/typescript.utils";
import { arrayToMap } from "../array.utils";
import { extract, notNil, selector } from "../functional.utils";
import { gqlSdk } from "../gqlSdk";

type Args = {
  registry: string; // e.g VCS
  registryProjectId: string; //e.g 1121
};

/**
 * Generates a unique key for a project using its registry and id.
 * @param {Project} project - The project.
 * @param {string} project.id - The id of the project.
 * @param {string} project.registry - The registry of the project.
 * @returns {string} The generated key.
 */
const projectKey = ({ registry, registryProjectId }: Project) =>
  `${registry}-${registryProjectId}`;

export type CarbonProject = Project & { content?: ProjectContent };
/**
 * Fetches a carbon project based on the provided registry and id.
 * @param {Object} args - The arguments.
 * @param {string} args.registry - The registry of the project (e.g., VCS).
 * @param {string} args.id - The id of the project (e.g., 1121).
 * @returns {Promise<CarbonProject|null>} The fetched project or null if not found.
 */
export const fetchCarbonProject = async (args: Args) => {
  const [{ allProject }, { allProjectContent }] = await Promise.all([
    gqlSdk.carbon_projects.getProject(args),
    gqlSdk.carbon_projects.getProjectContent(args),
  ]);

  const project = allProject.at(0);
  const content = allProjectContent.at(0);
  const key = projectKey(args);

  return {
    ...project,
    content,
    key,
  };
};

/**
 * Fetches all carbon projects and their content
 * @returns {Promise<CarbonProject[]>} An array of all fetched projects.
 */
export const fetchAllCarbonProjects = async (): Promise<CarbonProject[]> => {
  const { allProject } = await gqlSdk.carbon_projects.getAllProjects();
  const { allProjectContent } =
    await gqlSdk.carbon_projects.getAllProjectContent();

  const content: SetRequired<ProjectContent, "project">[] = pipe(
    compact,
    compose(filter, selector("project", notNil))
  )(allProjectContent);

  // Build a map for constant time lookup
  const contentMap = arrayToMap(content, pipe(extract("project"), projectKey));

  const projects: CarbonProject[] = allProject.map((project) =>
    merge(project, { content: contentMap.get(projectKey(project)) })
  );

  return projects;
};
