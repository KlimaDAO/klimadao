import { BigNumber } from "ethers";
import { CATEGORY_INFO } from "lib/getCategoryInfo";

/** These types are all derived from the open-api schema from api.carbonmark.com/openapi.json */
import type {
  Image,
  Activity as SDKActivity,
  Asset as SDKAsset,
  Category as SDKCategory,
  Country as SDKCountry,
  DetailedProject as SDKDetailedProject,
  Listing as SDKListing,
  Project as SDKProject,
  TokenPrice as SDKTokenPrice,
  User as SDKUser,
} from ".generated/carbonmark-api-sdk/types";

export type Project = SDKProject;
export type Listing = SDKListing;
export type TokenPrice = SDKTokenPrice;
export type Activity = SDKActivity;
export type User = SDKUser;
export type Category = SDKCategory;
export type Country = SDKCountry;
export type Asset = SDKAsset;
export type DetailedProject = SDKDetailedProject;
export type CarouselImage = Image;
export type CategoryName = keyof typeof CATEGORY_INFO;

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

export type AssetForRetirement = {
  id: string;
  amount: string;
  tokenName: string;
  balance: string;
  tokenSymbol: string; // 1: C3T, 2: TCO2
  project: PcbProject;
  token: Asset["token"];
};

export type Methodology = {
  id: string;
  name: string;
  category: CategoryName;
};

export type Vintage = string;

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
export type CarbonmarkPaymentMethod = "usdc" | "fiat" | "bank-transfer";
