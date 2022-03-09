import { EPOCH_INTERVAL } from "../../constants";

// Calculates estimated daily rebases based on current block rate
export function getEstimatedDailyRebases(blockRate: number) {
  const rebaseRate = blockRate * EPOCH_INTERVAL;
  const secondsInDay = 86400;
  const rebasesPerDay = secondsInDay / rebaseRate;
  return rebasesPerDay;
}
