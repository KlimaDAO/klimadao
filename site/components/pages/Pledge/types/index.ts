import * as yup from "yup";

import { formSchema } from "../lib";

export type { putPledgeParams } from "../lib/putPledge";

export type Category = {
  name: string;
  quantity: number;
};

export type Footprint = {
  timestamp: number;
  total: number;
  categories: Category[];
};

export type Wallet = {
  address: string;
  verified: boolean;
};

export type Pledge = {
  id: string;
  ownerAddress: string;
  name: string;
  nonce: string;
  profileImageUrl: string;
  profileWebsiteUrl: string;
  description: string;
  methodology: string;
  footprint: Footprint[];
  wallets: Wallet[];
  createdAt?: number;
  updatedAt?: number;
};

export type PledgeFormValues = yup.InferType<typeof formSchema>;

export interface Holding {
  id: string;
  timestamp: string;
  token: string;
  tokenAmount: string;
  carbonValue: string;
}
export interface QueryHoldings {
  data: {
    holdings: Holding[];
  };
}
