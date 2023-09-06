import { compact, merge } from "lodash";
import { filter, pipe } from "lodash/fp";
import { SetRequired } from "../../../../lib/utils/typescript.utils";
import { ProjectContent } from "../../.generated/types/carbonProjects.types";
import { CMSProject } from "../../graphql/carbonProjects.types";
import { arrayToMap } from "../array.utils";
import { extract, notNil, selector } from "../functional.utils";
import { gqlSdk } from "../gqlSdk";

type Args = {
  registry: string; // e.g VCS
  registryProjectId: string; //e.g 1121
};

/**
 * Generates a unique key for a project using its registry and id.
 */
const projectKey = ({
  registry,
  registryProjectId,
}: {
  registry: string | null;
  registryProjectId: string | null;
}) => `${registry}-${registryProjectId}`;

export type CarbonProject = CMSProject & {
  content?: ProjectContent;
};

/**
 * Fetches a carbon project based on the provided registry and id.
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
    ...content,
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
      content: contentMap.get(projectKey(project)),
    })
  );

  return projects;
};
