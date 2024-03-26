/** Price @klimadao/carbonmark/lib/types */
export type Price = {
  /** Lowercase name of pool / pool token e.g. "bct" */
  poolName: "bct" | "nct" | "ubo" | "nbo";
  /** Remaining supply in pool */
  supply: string;
  /** Address of the pool itself, e.g. bct token address */
  poolAddress: boolean;
  /** Address of the project token in this pool */
  projectTokenAddress: string;
  /** True if default project for pool and no selective redemption fee applies */
  isPoolDefault: boolean;
  /** formatted USDC.e price for 1 tonne e.g. "0.123456" */
  singleUnitPrice: string;
};

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
  prices: Price[];
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
  const res = await fetch(`https://api.carbonmark.com/projects/${project_key}`);
  const data = await res.json();
  return data;
}
