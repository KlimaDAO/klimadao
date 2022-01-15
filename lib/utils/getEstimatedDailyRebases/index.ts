import { EPOCH_INTERVAL } from "../../constants/index";

// Calculates estimated daily rebases based on current block rate
export async function getEstimatedDailyRebases(blockRate: number) {
  const rebaseRate = blockRate * EPOCH_INTERVAL;
  const secondsInDay = 86400;
  const rebasesPerDay = secondsInDay / rebaseRate;
  return rebasesPerDay;
}
