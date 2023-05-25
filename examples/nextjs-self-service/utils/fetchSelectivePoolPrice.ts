import { Pool } from "@/types";
import { BigNumberish, formatUnits, parseUnits } from "ethers";
import { getAggregatorContract } from "./getAggregatorContract";
import { getTokenInfo } from "./getTokenInfo";

/**
 * Uses the KlimaDAO retirement aggregator to get a price quote for the given carbon pool.
 * Returns formatted price in USDC.
 * Price includes all relevant fees.
 */
export async function fetchDefaultPoolPrice(params: {
  pool: Pool;
  quantity: number;
}): Promise<string> {
  /** Convert quantity to a BigInt with appropriate decimal conversion */
  const tokenDecimals = getTokenInfo(params.pool).decimals;
  const parsed = parseUnits(
    params.quantity.toFixed(tokenDecimals),
    tokenDecimals
  );
  const RetirementAggregator = getAggregatorContract();
  const BigInt: BigNumberish =
    await RetirementAggregator.getSourceAmountSpecificRetirement(
      getTokenInfo("usdc").address,
      getTokenInfo(params.pool).address,
      parsed
    );
  return formatUnits(BigInt, getTokenInfo("usdc").decimals);
}
