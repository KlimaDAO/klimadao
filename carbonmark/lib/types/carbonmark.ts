import type schema from ".generated/carbonmark-api.schema";
import { BigNumber } from "ethers";
import type { NormalizeOAS, OASModel } from "fets";
import { notNil } from "lib/utils/functional.utils";

export type CarouselImage = DetailedProject["images"][number];

export type Project = OASModel<NormalizeOAS<typeof schema>, "Project">;
export type Listing = OASModel<NormalizeOAS<typeof schema>, "Listing">;
export type TokenPrice = OASModel<NormalizeOAS<typeof schema>, "TokenPrice">;
export type Activity = OASModel<NormalizeOAS<typeof schema>, "Activity">;

export type DetailedProject = OASModel<
  NormalizeOAS<typeof schema>,
  "DetailedProject"
>;

export function isTokenPrice(obj: unknown): obj is TokenPrice {
  return (
    notNil(obj) &&
    typeof obj === "object" &&
    "singleUnitPrice" in obj &&
    "totalSupply" in obj &&
    "totalRetired" in obj &&
    "totalBridged" in obj
  );
}
export interface PcbProject {
  id: string;
  projectID: string;
  name: string;
  methodology: string;
  vintage: string;
  tokenAddress: string;
  registry: string;
  country: string;
  location?: {
    type: "Feature";
    geometry: {
      type: "Point";
      coordinates: [number, number];
    };
  };
  description?: string;
  isPoolProject?: boolean;
  totalBridged: string | null;
  totalRetired: string | null;
  currentSupply: string | null;
  prices?: TokenPrice[];
  url?: string;
  methodologyCategory: CategoryName;
  category: string;
  coBenefits: string;
  correspAdjustment: string;
  emissionType: string;
  isCorsiaCompliant: boolean;
  klimaRanking: string;
  lastUpdate: string;
  method: string;
  region: string;
  standard: string;
  storageMethod: string;
  vintageYear: string;
}

export type ActivityActionT =
  | "UpdatedQuantity"
  | "UpdatedPrice"
  | "CreatedListing"
  | "DeletedListing"
  | "Purchase"
  | "Sold";

export interface ProjectActivity {
  /** txnHash + ActivityType
   * @example "0x12345CreatedListing" */
  id: string;
  /** Stringified 18 decimal BigNumber */
  amount: string;
  /** Stringified 18 decimal BigNumber */
  previousAmount: null | string;
  /** Stringified 6 decimal BigNumber */
  price: string;
  /** Stringified 6 decimal BigNumber */
  previousPrice: null | string;
  /** Unix seconds timestamp */
  timeStamp: string;
  /** String identifying the activity */
  activityType: ActivityActionT;
  seller: {
    id: string;
    handle?: string;
  };
  buyer: null | {
    id: string;
    handle?: string;
  };
}

export interface UserActivity {
  /** txnHash + ActivityType
   * @example "0x12345CreatedListing" */
  id: string;
  /** Stringified 18 decimal BigNumber */
  amount: string;
  /** Stringified 18 decimal BigNumber */
  previousAmount: null | string;
  /** Stringified 6 decimal BigNumber */
  price: string;
  /** Stringified 6 decimal BigNumber */
  previousPrice: null | string;
  /** Unix seconds timestamp */
  timeStamp: string;
  /** String identifying the activity */
  activityType: ActivityActionT;
  project: {
    /** Name of the project
     * @example "5MW Biomass Based Cogeneration Project at Sainsons" */
    name: string;
    /** TODO this can be removed when methodologies is passed down */
    category: Category;
    /** @example "0x3" */
    id: string;
    /** @example "VCS-1547" */
    key: string;
    /** Registry project id number
     * @example "1547" */
    projectId: string;
    /** TODO: api needs to remove and replace with `methodologies` */
    methodology: string;
    /** @example "2020" */
    vintage: string;
    /** Address for the project token */
    projectAddress: string;
    /** @example "VCS" */
    registry: string;
  };
  seller: {
    id: string;
    handle?: string;
  };
  buyer: null | {
    id: string;
    handle?: string;
  };
}

export type Asset = {
  id: string;
  token: {
    id: string;
    name: string;
    symbol: "BCT" | "NBO" | "UBO" | "NCT" | `${"TCO2-" | "C3T-"}${string}`;
    decimals: number;
  };
  amount: string;
};

// data from C3 ABI function "getProjectInfo"
export type ProjectInfo = {
  active: boolean;
  country: string;
  methodology: string;
  name: string;
  period_end: BigNumber;
  period_start: BigNumber;
  project_id: string;
  region: string | "";
  registry: "GS";
  uri: string;
  project_type: string;
};

export type AssetForListing = {
  tokenAddress: string;
  tokenName: string;
  balance: string;
  tokenType: "1" | "2"; // 1: C3T, 2: TCO2
  project?: {
    key: string;
    vintage: string;
    name?: string;
    projectID: string;
    methodology: string;
    category: CategoryName;
  };
};

export type AssetForRetirement = {
  tokenName: string;
  balance: string;
  tokenType: "1" | "2";
  tokenSymbol: string; // 1: C3T, 2: TCO2
  project: PcbProject;
};
export type Methodology = {
  id: string;
  name: string;
  category: CategoryName;
};

export type Category = {
  id: CategoryName;
};

export type Country = {
  id: string;
};

export type Vintage = string;

const CATEGORY_NAMES = [
  "Agriculture",
  "Energy Efficiency",
  "Forestry",
  "Industrial Processing",
  "Renewable Energy",
  "Other",
  "Other Nature-Based",
  "Blue Carbon",
] as const;

export type CategoryName = (typeof CATEGORY_NAMES)[number];

export function isCategoryName(name: string): name is CategoryName {
  return CATEGORY_NAMES.includes(name as CategoryName);
}

export type Purchase = {
  id: string;
  amount: string;
  listing: {
    project: {
      country: string;
      key: string;
      methodology: string;
      name: string;
      projectID: string;
      vintage: string;
    };
  };
  price: string;
};

export type CarbonmarkToken = "usdc" | "c3" | "tco2";

export type Balance = {
  tokenName: CarbonmarkToken;
  balance: string;
};

// add more methods here later
export type CarbonmarkPaymentMethod = "usdc" | "fiat";
