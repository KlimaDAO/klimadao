import { PoolToken } from "@klimadao/lib/constants";
import { BigNumber } from "ethers";

export interface CarouselImage {
  url: string;
  caption: string;
}

export interface Project {
  id: string;
  key: string;
  projectID: string;
  name: string | "";
  methodologies: Array<Methodology>;
  vintage: string;
  images: Array<CarouselImage>;
  projectAddress: string;
  registry: string;
  listings: Listing[] | null;
  price: BigNumber;
  country: Country | null;
  activities: ProjectActivity[] | null;
  updatedAt: string; // timestamp
  location?: {
    // only defined for Verra projects
    type: "Feature";
    geometry: {
      type: "Point";
      coordinates: [number, number];
    };
  };
  description?: string;
  short_description?: string;
  long_description?: string;
  isPoolProject?: boolean; // pool project only
  totalBridged: string | null; // pool project only
  totalRetired: string | null; // pool project only
  currentSupply: string | null; // pool project only
  prices?: Price[];
  url: string;
  methodologyCategory: CategoryName;
}

export interface PcbProject {
  id: string;
  projectID: string;
  name: string;
  methodology: string;
  vintage: string;
  tokenAddress: string;
  registry: string;
  country: Country | null;
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
  name: Uppercase<PoolToken>;
  poolTokenAddress: string;
  isPoolDefault: boolean;
  tokenAddress: string;
  singleUnitPrice: string; // NOT A BIGNUMBER ! Already formatted in USDCs
  leftToSell: string; // NOT A BIGNUMBER ! Already formatted!
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
    country?: Country;
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
  /** Transaction hash */
  id: string;
  /** Stringified 18 decimal BigNumber */
  amount: BigNumber;
  /** The purchased listing info */
  listing: ListingWithProject;
  /** Stringified 6 decimal BigNumber */
  price: string;
  /** Unix seconds timestamp */
  timeStamp: string;
  user: {
    id: string;
  };
};

export type CarbonmarkToken = "usdc" | "c3" | "tco2";

export type Balance = {
  tokenName: CarbonmarkToken;
  balance: string;
};

// add more methods here later
export type CarbonmarkPaymentMethod = "usdc" | "fiat";
