import { compact, includes, merge } from "lodash";
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

const standards = ["VCS", "PURO", "ICR"] as const;

/** Known supported standards on-chain */
export type Standard = (typeof standards)[number];
/** Project id number as it appears in the registry, stringified to preserve leading zeros @example "191" */
export type RegistryProjectId = string;
/** Credit vintage @example 2008 */
export type Vintage = string;
/** @example "VCS-191" */
export type ProjectIdentifier = `${Standard}-${RegistryProjectId}`;
/** Full credit id, converted to uppercase @example "VCS-191-2008" */
export type CreditIdentifier = `${ProjectIdentifier}-${Vintage}`;

type UntypedParams = {
  standard: string;
  vintage: string;
  registryProjectId: string;
};

/* eslint-disable @typescript-eslint/consistent-type-assertions -- type guards */
/**
 * Utility class for more safety and consistency when dealing with Project and credit Ids.
 *
 * Convenient accessors for standard, registryProjectId, vintage, projectId
 * Convenient utility methods for validating or splitting an id
 * Converts to uppercase
 */
export class CreditId {
  standard: Standard;
  registryProjectId: RegistryProjectId;
  vintage: Vintage;
  projectId: ProjectIdentifier;
  creditId: CreditIdentifier;

  constructor(params: UntypedParams);
  constructor(params: string);
  constructor(params: string | UntypedParams) {
    if (CreditId.isValidCreditId(params)) {
      const [standard, registryProjectId, vintage] =
        CreditId.splitCreditId(params);
      this.standard = standard;
      this.registryProjectId = registryProjectId;
      this.vintage = vintage;
      this.projectId = `${standard}-${registryProjectId}`;
      this.creditId = `${this.projectId}-${vintage}`;
    } else if (CreditId.isValidParams(params)) {
      this.standard = params.standard.toUpperCase() as Standard;
      this.registryProjectId = params.registryProjectId;
      this.vintage = params.vintage;
      this.projectId = `${this.standard}-${params.registryProjectId}`;
      this.creditId = `${this.projectId}-${params.vintage}`;
    } else {
      throw new Error(`Failed to parse CreditId: ${params}`);
    }
  }

  toString(): string {
    return this.creditId;
  }

  /** Case insensitive type-guard @example isValidCreditId("Vcs-191-2008") // true */
  static isValidCreditId = (id: unknown): id is CreditIdentifier => {
    if (typeof id !== "string") {
      return false;
    }
    const pattern = /^(VCS|PURO|ICR)-\d+-(19\d{2}|20\d{2})$/i; // case insensitive
    return pattern.test(id);
  };

  private static isValidParams(params: unknown): params is UntypedParams {
    if (!params || typeof params !== "object") return false;
    const typedParams = params as Partial<UntypedParams>;
    return (
      includes(standards, typedParams.standard?.toUpperCase()) &&
      !!Number(typedParams.registryProjectId) &&
      !!Number(typedParams.vintage)
    );
  }

  /** Validates, splits and capitalizes a CreditIdentifier string */
  static splitCreditId(
    creditId: string
  ): [Standard, RegistryProjectId, Vintage] {
    if (!this.isValidCreditId(creditId)) throw new Error("Invalid Id");
    const [standard, registryProjectId, vintage] = creditId.split("-");
    return [standard.toUpperCase() as Standard, registryProjectId, vintage];
  }
}
/* eslint-enable @typescript-eslint/consistent-type-assertions -- type guards */

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
