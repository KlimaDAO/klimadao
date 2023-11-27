import { Pool } from "./charts/types";

/** Returns the label for a pool id */
export function getPoolLabel(pool: Pool) {
  return pool.toUpperCase();
}
