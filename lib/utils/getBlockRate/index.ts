import { API_KEY } from "../../constants";

// Calculated based on Remaining Blocks (to reach block no. 999999999)
// divided by Estimated Time In Seconds to reach that block

export async function getBlockRate() {
  let blockRateSeconds = 2.5;
  const data = await (
    await fetch(
      `https://api.polygonscan.com/api?module=block&action=getblockcountdown&blockno=999999999&apikey=${API_KEY}`
    )
  ).json();

  if (data.status === "1") {
    blockRateSeconds =
      data.result.EstimateTimeInSec / data.result.RemainingBlock;
  }
  return blockRateSeconds;
}
