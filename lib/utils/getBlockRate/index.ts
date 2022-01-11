import { API_KEY } from "../../constants";

// Calculated based on Remaining Blocks (to reach block no. 999999999)
// divided by Estimated Time In Seconds to reach that block
// If api call is not fetching required data, default block rate is returned
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
