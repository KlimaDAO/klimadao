import { compact } from "lodash";
import { filter, pipe } from "lodash/fp";
import {
  GetCmsProjectContentQuery,
  GetCmsProjectQuery,
  ProjectContent,
} from "../../.generated/types/cms.types";
import { arrayToMap } from "../array.utils";
import { extract, notNil, selector } from "../functional.utils";
import { GQL_SDK } from "../gqlSdk";
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

type CmsProject = GetCmsProjectQuery["allProject"][number];
type CmsProjectContent = GetCmsProjectContentQuery["allProjectContent"][number];

export type CarbonProject = Omit<CmsProject, "__typename"> &
  Omit<CmsProjectContent, "__typename"> & {
    key: string;
  };

/**
 * Merges a carbon project with carbon content
 */
const mergeCarbonProjectAndContent = (
  project?: CmsProject,
  content?: CmsProjectContent
) => {
  if (isNil(project) || isNil(content)) return null;
  const carbonProject = {
    ...project,
    ...content,
    key: projectKey(project),
  };
  return carbonProject;
};

/**
 * Fetches a carbon project based on the provided registry and id.
 */
export const fetchCarbonProject = async (
  sdk: GQL_SDK,
  args: Args
): Promise<CarbonProject | null> => {
  const [{ allProject }, { allProjectContent }] = await Promise.all([
    sdk.cms.getCMSProject(args),
    sdk.cms.getCMSProjectContent(args),
  ]);
  return mergeCarbonProjectAndContent(
    allProject.at(0),
    allProjectContent.at(0)
  );
};

/**
 * Fetches all carbon projects and their content
 * @returns {Promise<CarbonProject[]>} An array of all fetched projects.
 */
export const fetchAllCarbonProjects = async (
  sdk: GQL_SDK
): Promise<CarbonProject[]> => {
  const [{ allProject }, { allProjectContent }] = await Promise.all([
    sdk.cms.getAllCMSProjects(),
    sdk.cms.getAllCMSProjectContent(),
  ]);

  // Clean the content, removing those without project references
  const content = pipe(
    compact,
    filter(selector<ProjectContent, "project">("project", notNil))
  )(allProjectContent);

  // Build a map for constant time lookup
  const contentMap = arrayToMap(content, pipe(extract("project"), projectKey));

  // Pair Projects with their content
  const projects: CarbonProject[] = [];
  allProject.forEach((project) => {
    const merged = mergeCarbonProjectAndContent(
      project,
      contentMap.get(projectKey(project))
    );
    merged && projects.push(merged);
  });

  return projects;
};
