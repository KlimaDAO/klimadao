import { API_KEY, MONTH_IN_SECONDS } from "../../constants";

// Calculates block rate by dividing one month in seconds by number of blocks that got created during that month

export async function getBlockRate() {
  let blockRateSeconds = 2.5;

  // Unix timestamp in seconds
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const timestamp30DaysAgo = currentTimestamp - MONTH_IN_SECONDS;
  try {
    const blockRateFuture = await (
      await fetch(
        `https://api.polygonscan.com/api?module=block&action=getblockcountdown&blockno=999999999&apikey=${API_KEY}`
      )
    ).json();

    const blockRate30DaysAgo = await (
      await fetch(
        `https://api.polygonscan.com/api?module=block&action=getblocknobytime&timestamp=${timestamp30DaysAgo}&closest=before&apikey=${API_KEY}`
      )
    ).json();

    blockRateSeconds =
      MONTH_IN_SECONDS /
      (blockRateFuture.result.CurrentBlock - blockRate30DaysAgo.result);
  } catch (err) {
    console.log(err);
  }

  return blockRateSeconds;
}
