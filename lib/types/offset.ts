import { BigNumber } from "ethers";
import { RetirementToken } from "../constants";
interface GasUsed {
  type: string;
  hex: string;
}

interface Log {
  transactionIndex: number;
  blockNumber: number;
  transactionHash: string;
  address: string;
  topics: string[];
  data: string;
  logIndex: number;
  blockHash: string;
}

interface CumulativeGasUsed {
  type: string;
  hex: string;
}

interface EffectiveGasPrice {
  type: string;
  hex: string;
}

interface Event {
  transactionIndex: number;
  blockNumber: number;
  transactionHash: string;
  address: string;
  topics: string[];
  data: string;
  logIndex: number;
  blockHash: string;
}

export interface RetirementReceipt {
  to: string;
  from: string;
  contractAddress?: null | string;
  transactionIndex: number;
  gasUsed: GasUsed;
  logsBloom: string;
  blockHash: string;
  transactionHash: string;
  logs: Log[];
  blockNumber: number;
  confirmations: number;
  cumulativeGasUsed: CumulativeGasUsed;
  effectiveGasPrice: EffectiveGasPrice;
  status: number;
  type: number;
  byzantium: boolean;
  events: Event[];
}

export type RetirementTotals = [
  totalRetirements: BigNumber,
  totalTonnesCarbonRetired: BigNumber,
  totalTonnesClaimedForNFTS: BigNumber
];

export type RetirementIndexInfo = [
  tokenAddress: string,
  amount: BigNumber,
  beneficiaryName: string,
  retirementMessage: string
];

export type RetirementIndexInfoResult = {
  tokenAddress: RetirementIndexInfo[0];
  typeOfToken: RetirementToken;
  amount: string;
  beneficiaryName: RetirementIndexInfo[2];
  retirementMessage: RetirementIndexInfo[3];
};

export type RetirementsResult = {
  totalRetirements: ReturnType<RetirementTotals[0]["toString"]>;
  totalTonnesCarbonRetired: string;
  totalTonnesClaimedForNFTS: string;
};
