import { parseUnits } from "ethers";

interface Fees {
  maxPriorityFee: number;
  maxFee: number;
}

interface GasStationResponse {
  safeLow: Fees;
  standard: Fees;
  fast: Fees;
  estimatedBaseFee: number;
  blockTime: number;
  blockNumber: number;
}

interface GasOptions {
  maxFeePerGas: bigint;
  maxPriorityFeePerGas: bigint;
}

/** Invoke this immediately before dispatching a txn */
export const fetchGasPrices = async (): Promise<GasOptions> => {
  try {
    const res = await fetch("https://gasstation-mainnet.matic.network/v2", {
      headers: {
        "Cache-Control": "max-age=1800 s-maxage=1800",
      },
    });
    const json: GasStationResponse = await res.json();
    // json.fast.maxFee gives us the block.baseFee + maxPriorityFee
    // but if the block fee increases during high traffic, we are underpriced
    // multiply maxFee by 3 to support a theoretical minimum of 10 blocks (+12.5% each block)
    const maxFeePerGas = Math.floor(json.fast.maxFee * 3).toString();
    const maxPriorityFeePerGas = Math.floor(
      json.fast.maxPriorityFee * 1.1
    ).toString();
    return {
      maxFeePerGas: parseUnits(maxFeePerGas, "gwei"),
      maxPriorityFeePerGas: parseUnits(maxPriorityFeePerGas, "gwei"),
    };
  } catch (e) {
    console.error(e);
    return {
      maxFeePerGas: parseUnits("300", "gwei"),
      maxPriorityFeePerGas: parseUnits("80", "gwei"),
    };
  }
};
