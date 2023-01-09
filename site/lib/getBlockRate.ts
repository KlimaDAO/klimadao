import { getInfuraUrl, getJsonRpcProvider } from "@klimadao/lib/utils";
import { MONTH_IN_SECONDS } from "lib/constants";
import { INFURA_ID, POLYGONSCAN_API_KEY } from "lib/secrets";

/** Calculates block rate by dividing one month in seconds by number of blocks that got created during that month */
export async function getBlockRate(): Promise<number> {
  const fallbackBlockRate = 2.5;

  // Unix timestamp in seconds
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const timestamp30DaysAgo = currentTimestamp - MONTH_IN_SECONDS;
  try {
    const provider = getJsonRpcProvider(
      getInfuraUrl({
        chain: "polygon",
        infuraId: INFURA_ID,
      })
    );
    const latestBlock = await provider.getBlock("latest");

    let url = `https://api.polygonscan.com/api?module=block&action=getblocknobytime&timestamp=${timestamp30DaysAgo}&closest=before`;

    if (POLYGONSCAN_API_KEY !== undefined) {
      url = url + `&apikey=${POLYGONSCAN_API_KEY}`;
    }

    const res = await fetch(url);
    const block30DaysAgo = await res.json();

    const blockRateSeconds =
      MONTH_IN_SECONDS / (latestBlock.number - block30DaysAgo.result);

    if (!Number.isNaN(blockRateSeconds)) {
      return blockRateSeconds;
    }
  } catch (err) {
    console.error(err);
  }

  return fallbackBlockRate;
}
