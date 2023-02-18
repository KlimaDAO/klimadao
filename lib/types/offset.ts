import { BigNumber } from "ethers";
import { RetirementToken } from "../constants";
import { formatUnits } from "../utils";
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

type RetirementTotalsFormatted = {
  totalTonnesRetired: ReturnType<RetirementTotals[0]["toString"]>;
  totalRetirements: ReturnType<typeof formatUnits>;
  totalTonnesClaimedForNFTS: ReturnType<typeof formatUnits>;
};

type RetirementPoolInfo = {
  [key in RetirementToken]: ReturnType<typeof formatUnits>;
};

export type RetirementsTotalsAndBalances = RetirementTotalsFormatted &
  RetirementPoolInfo;

export type RetirementIndexInfo = [
  tokenAddress: string,
  amount: BigNumber,
  beneficiaryName: string,
  retirementMessage: string
];
