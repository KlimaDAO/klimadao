import { Pool } from "@/types";
import { BigNumberish, formatUnits, parseUnits } from "ethers";
import { getAggregatorContract } from "./getAggregatorContract";
import { getTokenInfo } from "./getTokenInfo";

/**
 * Uses the KlimaDAO retirement aggregator to get a price quote for the given carbon pool.
 * Returns formatted price in USDC.e.
 * Price includes all relevant fees.
 */
export async function fetchPoolPrice(params: {
  pool: Pool;
  /** Each pool has a different fee for selective retirements */
  mode: "default" | "selective";
  quantity: number;
}): Promise<string> {
  /** Convert quantity to a BigInt with appropriate decimal conversion */
  const tokenDecimals = getTokenInfo(params.pool).decimals;

  const parsed = parseUnits(
    params.quantity.toFixed(tokenDecimals),
    tokenDecimals
  );

  const RetirementAggregator = getAggregatorContract();

  const method =
    params.mode === "default"
      ? "getSourceAmountDefaultRetirement"
      : "getSourceAmountSpecificRetirement";

  const BigInt: BigNumberish = await RetirementAggregator[method](
    getTokenInfo("usdc").address,
    getTokenInfo(params.pool).address,
    parsed
  );

  return formatUnits(BigInt, getTokenInfo("usdc").decimals);
}
