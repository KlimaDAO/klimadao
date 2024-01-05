import { compact, merge } from "lodash";
import { filter, pipe } from "lodash/fp";
import { SetRequired } from "../../../../lib/utils/typescript.utils";
import {
  CmsGetCmsProjectQuery,
  CmsProjectContent,
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

export type CarbonProject = CmsGetCmsProjectQuery["allProject"][number] & {
  content?: CmsProjectContent;
};

/**
 * Fetches a carbon project based on the provided registry and id.
 */
export const fetchCMSProject = async (sdk: GQL_SDK, args: Args) => {
  const [{ allProject }, { allProjectContent }] = await Promise.all([
    sdk.cms.getCMSProject(args),
    sdk.cms.getCMSProjectContent(args),
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
    filter(
      selector<SetRequired<CmsProjectContent, "project">>("project", notNil)
    )
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
