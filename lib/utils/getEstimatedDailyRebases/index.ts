import { AVERAGE_BLOCK_RATE, EPOCH_INTERVAL } from "../../constants";

// Calculates estimated daily rebases based on current block rate
export function getEstimatedDailyRebases() {
  const rebaseRate = AVERAGE_BLOCK_RATE * EPOCH_INTERVAL;
  const secondsInDay = 86400;
  const rebasesPerDay = secondsInDay / rebaseRate;
  return rebasesPerDay;
}
