import type schema from ".generated/carbonmark-api.schema";
import { PoolToken } from "@klimadao/lib/constants";
import { BigNumber } from "ethers";
import type { NormalizeOAS, OASModel } from "fets";

export interface CarouselImage {
  url: string;
  caption: string;
}

export type Project = OASModel<NormalizeOAS<typeof schema>, "Project">;

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
  prices?: Price[];
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

export type Price = {
  /** Lowercase name of pool / pool token e.g. "bct" */
  poolName: Exclude<PoolToken, "mco2">;
  /** Remaining supply in pool */
  supply: string;
  /** Address of the pool itself, e.g. bct token address */
  poolAddress: boolean;
  /** Address of the project token in this pool */
  projectTokenAddress: string;
  /** True if default project for pool and no selective redemption fee applies */
  isPoolDefault: boolean;
  /** formatted USDC price for 1 tonne e.g. "0.123456" */
  singleUnitPrice: string;
};

export interface User {
  handle: string;
  username: string;
  description: string;
  profileImgUrl: string | null;
  wallet: string;
  listings: ListingWithProject[];
  activities: UserActivity[];
  assets: Asset[];
}

export interface Listing {
  id: string;
  /** Plain integer, not a bignumber */
  totalAmountToSell: string;
  /** Unformatted 18 decimal string */
  leftToSell: string;
  tokenAddress: string;
  active: boolean; // false when amount is "0"
  deleted: boolean; // user deleted this listing
  batches: [];
  batchPrices: [];
  /** Unformatted USDC e.g. 1000000 */
  singleUnitPrice: string;
  createdAt: string;
  updatedAt: string;
  seller?: {
    handle: string;
    username: string;
    description: string;
    profileImgUrl: string;
    id: string;
  };
}

/** Some endpoints do not include this `project` property. */
export interface ListingWithProject extends Listing {
  /** careful, project is not present on Project["listings"] entries */
  project: {
    id: string;
    key: string;
    name: string;
    category: Category;
    /** TODO: from api, in /user.listings, Country is not present */
    country?: string;
    methodology: string;
    projectAddress: string;
    projectID: string;
    registry: string;
    vintage: string;
  };
}

export type PriceFlagged = Price & {
  isPoolProject: true;
};

export type ProjectBuyOption = Listing | PriceFlagged;

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

export type CategoryName =
  | "Agriculture"
  | "Energy Efficiency"
  | "Forestry"
  | "Industrial Processing"
  | "Renewable Energy"
  | "Other"
  | "Other Nature-Based"
  | "Blue Carbon";

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
