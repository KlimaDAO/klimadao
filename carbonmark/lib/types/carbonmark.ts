import { PoolToken } from "@klimadao/lib/constants";
import { BigNumber } from "ethers";

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

export type CategoryName =
  | "Agriculture"
  | "Energy Efficiency"
  | "Forestry"
  | "Industrial Processing"
  | "Renewable Energy"
  | "Other"
  | "Other Nature-Based"
  | "Blue Carbon";

export type CarbonmarkToken = "usdc" | "c3" | "tco2";

export type Balance = {
  tokenName: CarbonmarkToken;
  balance: string;
};

// add more methods here later
export type CarbonmarkPaymentMethod = "usdc" | "fiat";
