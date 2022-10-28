export interface Project {
  id: string;
  key: string;
  projectID: string;
  name: string;
  methodology: string;
  vintage: string;
  projectAddress: string;
  registry: string;
}

export interface User {
  handle: string;
  username: string;
  description: string;
  wallet: string;
  listings: Listing[];
  activities: Activity[];
}

type Listing = {
  id: number;
  totalAmountToSell: number;
  tokenAddress: string;
  active: boolean;
  deleted: boolean;
  batches: [];
  batchPrices: [];
  singleUnitPrice: number;
  project: {
    name: string;
    category: string;
  };
};

type Activity = {
  id: number;
  amount: number;
  previousAmount: number;
  price: number;
  previousPrice: number;
  timeStamp: number;
  batchPrices: [];
  singleUnitPrice: number;
  project: {
    key: string;
  };
  seller: {
    id: string;
  };
  buyer: {
    id: string;
  };
};
