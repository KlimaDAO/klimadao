import { API_KEY } from "../../constants";

export async function getBlockRate() {
  let blockRateSeconds = 2.5;
  await fetch(
    `https://api.polygonscan.com/api?module=block&action=getblockcountdown&blockno=99999999&apikey=${API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      blockRateSeconds =
        data.result.EstimateTimeInSec / data.result.RemainingBlock;
    })
    .catch((err) => console.log(err));
  return blockRateSeconds;
}
