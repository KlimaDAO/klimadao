import { BLOCK_RATE_SECONDS, EPOCH_INTERVAL } from "../../constants";

export function secondsUntilBlock(startBlock: number, endBlock: number) {
  if (startBlock % EPOCH_INTERVAL === 0) {
    return 0;
  }

  const blocksAway = endBlock - startBlock;
  const secondsAway = blocksAway * BLOCK_RATE_SECONDS;

  return secondsAway;
}
