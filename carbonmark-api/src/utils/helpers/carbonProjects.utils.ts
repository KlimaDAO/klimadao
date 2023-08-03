import { compact, merge, omit } from "lodash";
import { filter, pipe } from "lodash/fp";
import {
  Methodology,
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

export type ModifiedMethodology = Omit<Methodology, "id" | "_id"> & {
  id: string;
};

const relabelMethodology = (methodology: Methodology): ModifiedMethodology =>
  merge(omit(methodology, ["_id", "id"]), {
    id: methodology._id ?? methodology.id?.current ?? "",
  });

export type CarbonProject = Project & {
  content?: ProjectContent;
  methodologies: ModifiedMethodology[];
};
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
    methodologies: compact(project?.methodologies)?.map(relabelMethodology),
    content,
    key,
  };
};

/**
 * Fetches all carbon projects and their content
 * @returns {Promise<CarbonProject[]>} An array of all fetched projects.
 */
export const fetchAllCarbonProjects = async (): Promise<CarbonProject[]> => {
  const [{ allProject }, { allProjectContent }] = await Promise.all([
    gqlSdk.carbon_projects.getAllProjects(),
    gqlSdk.carbon_projects.getAllProjectContent(),
  ]);

  // Clean the content, removing those without project references
  const content = pipe(
    compact,
    filter(selector<SetRequired<ProjectContent, "project">>("project", notNil))
  )(allProjectContent);

  // Build a map for constant time lookup
  const contentMap = arrayToMap(content, pipe(extract("project"), projectKey));

  // Pair Projects with their content
  const projects: CarbonProject[] = allProject.map((project) =>
    merge(project, {
      methodologies: compact(project?.methodologies)?.map(relabelMethodology),
      content: contentMap.get(projectKey(project)),
    })
  );

  return projects;
};
