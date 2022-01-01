import { EPOCH_INTERVAL } from "../../constants";

export function secondsUntilBlock(
  startBlock: number,
  endBlock: number,
  blockRateSeconds: number
) {
  if (startBlock % EPOCH_INTERVAL === 0) {
    return 0;
  }
  const blocksAway = endBlock - startBlock;
  const secondsAway = blocksAway * blockRateSeconds;

  return secondsAway;
}
