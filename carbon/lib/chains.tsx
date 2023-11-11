import { Chain } from "./charts/types";

/** Returns the label for a chain id */
export function getChainLabel(chain: Chain) {
  if (chain == "polygon") return "Polygon";
  if (chain == "eth") return "Ethereum";
  if (chain == "celo") return "Celo";
  return "";
}
