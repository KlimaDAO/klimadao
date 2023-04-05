import { BigNumber } from "ethers";

export interface Project {
  id: string;
  key: string;
  projectID: string;
  name: string | "";
  methodologies: [
    {
      id: string;
      name: string;
      category: string;
    }
  ];
  methodology: string;
  vintage: string;
  projectAddress: string;
  registry: string;
  category: Category | null;
  listings: Listing[] | null;
  price: BigNumber;
  country: Country | null;
  activities: ActivityType[] | null;
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
  isPoolProject?: boolean; // pool project only
  totalBridged: string | null; // pool project only
  totalRetired: string | null; // pool project only
  currentSupply: string | null; // pool project only
  prices?: Price[];
}

export type Price = {
  leftToSell: string; // NOT A BIGNUMBER ! Already formatted!
  tokenAddress: string;
  singleUnitPrice: string; // NOT A BIGNUMBER ! Already formatted in USDCs
  name: string;
};

export interface User {
  handle: string;
  username: string;
  description: string;
  profileImgUrl?: string;
  wallet: string;
  listings: Listing[];
  activities: ActivityType[];
  assets: Asset[];
}

export type Listing = {
  id: string;
  createdAt: string;
  updatedAt: string;
  totalAmountToSell: BigNumber;
  /** Unformatted 18 decimal string */
  leftToSell: string;
  tokenAddress: string;
  active: boolean; // false when amount is "0"
  deleted: boolean; // user deleted this listing
  batches: [];
  batchPrices: [];
  /** Unformatted USDC e.g. 1000000 */
  singleUnitPrice: string;
  project: {
    id: string;
    key: string;
    name: string;
    category: Category;
    methodology: string;
    projectAddress: string;
    projectID: string;
    registry: string;
    vintage: string;
    country: Country;
  };
  seller?: {
    handle: string;
    username: string;
    description: string;
    id: string;
  };
};

export type PriceFlagged = Price & {
  isPoolProject: true;
};

// makes sense to convert more BigNumbers !
// see https://github.com/Atmosfearful/bezos-frontend/issues/50
export type ListingFormatted = Omit<Listing, "singleUnitPrice"> & {
  singleUnitPrice: string; // USDCs
};

export type ProjectBuyOption = ListingFormatted | PriceFlagged;

/**
 * A type representing possible activity actions (e.g "Sold", "Purchase" etc)
 * Sourced from: https://github.com/Atmosfearful/bezos-frontend/issues/9#issuecomment-1348069483
 */
export type ActivityActionT =
  | "UpdatedQuantity"
  | "UpdatedPrice"
  | "CreatedListing"
  | "DeletedListing"
  | "Purchase"
  | "Sold";

export type ActivityType = {
  id: number;
  activityType: ActivityActionT; // CreatedListing, DeletedListing, UpdatedPrice ...
  amount: BigNumber | null;
  previousAmount: BigNumber | null;
  price: BigNumber | null;
  previousPrice: BigNumber | null;
  timeStamp: string;
  batchPrices: [];
  singleUnitPrice: BigNumber | null;
  project: {
    id: string;
    key: string;
    name: string;
    category: Category;
    methodology: string;
    projectAddress: string;
    projectID: string;
    registry: string;
    vintage: string;
  };
  seller: {
    id: string;
  };
  buyer: {
    id: string;
  } | null;
};

export type Asset = {
  token: {
    id: string;
    name: string;
    symbol: "BCT" | "NBO" | "UBO" | "NCT" | `${"TCO2-" | "C3T-"}${string}`;
    decimals: number;
  };
  amount: BigNumber;
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
  id: string; // TransactionHash
  amount: BigNumber;
  price: BigNumber;
  listing: Listing;
};

export type CarbonmarkToken = "usdc" | "c3" | "tc02";

export type Balance = {
  tokenName: CarbonmarkToken;
  balance: string;
};
