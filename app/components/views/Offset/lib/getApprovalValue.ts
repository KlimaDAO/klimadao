import { getTokenDecimals } from "@klimadao/lib/utils";

// We need to approve a little bit extra (here 1%)
// It's possible that the price can slip upward between approval and final transaction
const APPROVAL_SLIPPAGE = 0.01;

// TODO: stronger types
type Params = {
  cost: string;
  paymentMethod: string;
};

export const getApprovalValue = (params: Params): string => {
  const costAsNumber = Number(params.cost);
  const costPlusOnePercent = costAsNumber + costAsNumber * APPROVAL_SLIPPAGE;
  const decimals = getTokenDecimals(params.paymentMethod);
  return costPlusOnePercent.toFixed(decimals); // ethers throws with "underflow" if decimals exceeds
};
