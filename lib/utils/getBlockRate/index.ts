import { API_KEY, MONTH_IN_SECONDS } from "../../constants";

// Calculates block rate by dividing one month in seconds by number of blocks that got created during that month

export async function getBlockRate() {
  const fallbackBlockRate = 2.5;

  // Unix timestamp in seconds
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const timestamp30DaysAgo = currentTimestamp - MONTH_IN_SECONDS;
  try {
    const url = `https://api.polygonscan.com/api?module=block&action=getblockcountdown&blockno=999999999&apikey=${API_KEY}`;
    const res = await fetch(url);
    const blocksData = await res.json();

    const url2 = `https://api.polygonscan.com/api?module=block&action=getblocknobytime&timestamp=${timestamp30DaysAgo}&closest=before&apikey=${API_KEY}`;
    const res2 = await fetch(url2);
    const block30DaysAgo = await res2.json();

    const blockRateSeconds =
      MONTH_IN_SECONDS /
      (blocksData.result.CurrentBlock - block30DaysAgo.result);

    if (!Number.isNaN(blockRateSeconds)) {
      return blockRateSeconds;
    }
  } catch (err) {
    console.log(err);
  }

  return fallbackBlockRate;
}
