import { BigNumber, providers } from "ethers";
import { TxnStatus } from "lib/statusMessage";
import { Dispatch } from "react";

// Retire transaction preparation
export interface RetireCarbonTransactionProps {
  address: string;
  provider?: providers.JsonRpcProvider;
  quantity: string;
  beneficiaryAddress: string;
  beneficiaryName: string;
  retirementMessage: string;
  onStatus: (status: TxnStatus, message?: string | undefined) => void;
  retirementToken: string;
  tokenSymbol: string;
  tokenAddress: string;
  tokenId: string;
  tokenStandard: string;
  network: "polygon" | "mumbai";
  setRetireModalOpen: Dispatch<boolean>;
  setRetirementTransactionHash: Dispatch<string>;
  setRetirementTotals: Dispatch<number>;
  setRetirementBlockNumber: Dispatch<number>;
}

// Retire transaction result

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
interface GasUsed {
  type: string;
  hex: string;
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
  totalTonnesClaimedForNFTS: BigNumber,
];

export type RetireCarbonTransactionResult = {
  receipt: RetirementReceipt;
  retirementTotals: ReturnType<RetirementTotals[1]["toNumber"]>;
};
