import { BigNumber } from "ethers";

export interface Project {
  id: string;
  key: string;
  projectID: string;
  name: string;
  methodology: string;
  vintage: string;
  projectAddress: string;
  registry: string;
  category: Category;
}

export interface User {
  handle: string;
  username: string;
  description: string;
  wallet: string;
  listings: Listing[];
  activities: Activity[];
  assets: string[]; // token addresses
}

export type Listing = {
  id: string;
  totalAmountToSell: BigNumber;
  leftToSell: BigNumber;
  tokenAddress: string;
  active: boolean;
  deleted: boolean;
  batches: [];
  batchPrices: [];
  singleUnitPrice: BigNumber;
  project: {
    id: string;
    key: string;
    name: string;
    // category: Category; // still missing
    methodology: string;
    projectAddress: string;
    projectID: string;
    registry: string;
    vintage: string;
  };
};

export type Activity = {
  id: number;
  activityType: string; // CreatedListing, ...
  amount: BigNumber;
  previousAmount: BigNumber;
  price: BigNumber;
  previousPrice: BigNumber;
  timeStamp: number;
  batchPrices: [];
  singleUnitPrice: BigNumber;
  project: {
    id: string;
    key: string;
    name: string;
    // category: Category; // still missing
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
  };
};

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
};

export type Asset = {
  tokenAddress: string;
  tokenName: string;
  projectName: string;
  balance: string;
};

export type Stats = {
  tonnesSold: number;
  tonnesOwned: number;
  activeListings: number;
};

export type Category = "AM0052"; // TODO: what are the others?
