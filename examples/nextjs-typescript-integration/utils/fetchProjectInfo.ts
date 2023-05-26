/**
 * This interface is incomplete and subject to change in the near future.
 * More complete types and carbonmark API documentation will be published in the near future.
 */
export interface ProjectInfo {
  /**
   * [registry]-[projectID]-[vintage]
   * @example "VCS-123-2020"
   */
  key: string;
  /**
   * Project name
   * @example 4×50 MW Dayingjiang- 3 Hydropower Project Phases 1&2
   */
  name: string;
  /**
   * Token address for the project
   */
  projectAddress: string;
  /**
   * List of methodologies applied to the project
   */
  methodologies: {
    id: string;
    category: string;
    name: string;
  }[];
  /**
   * If this project is in any carbon pools, they appear in this array (unsorted)
   */
  prices: {
    leftToSell: string; // "377399.494465238154177015"
    tokenAddress: string; // 0x address
    singleUnitPrice: string; // "1.201203"
    name: "BCT" | "NCT" | "UBO" | "NBO";
  }[];
}

/**
 * Use the Carbonmark REST API to fetch info for a given project key.
 * At the moment, CORS blocks browser requests, so this is a server-only function.
 * */
export async function fetchProjectInfo(
  /**
   * {REGISTRY_KEY}-{PROJECT_ID}-{VINTAGE}
   * @example "VCS-191-2009"
   * */
  project_key: string
): Promise<ProjectInfo> {
  const res = await fetch(
    `https://api.carbonmark.com/api/projects/${project_key}`
  );
  const data = await res.json();
  return data;
}
