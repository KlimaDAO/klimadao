import { capitalize } from "lodash";
import { Bridge } from "./charts/types";

/** Returns the label for a bridge id */
export function getBridgeLabel(bridge: Bridge) {
  return capitalize(bridge);
}
