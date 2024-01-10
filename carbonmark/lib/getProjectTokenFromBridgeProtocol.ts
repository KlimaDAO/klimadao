import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import { carbonTokenInfoMap } from "./getTokenInfo";

type CarbonTokenKey = keyof typeof carbonTokenInfoMap;

export const getProjectTokenFromBridgeProtocol = (
  bridgeProtocol: KlimaRetire["retire"]["credit"]["bridgeProtocol"]
): CarbonTokenKey => {
  let projectTokenName: CarbonTokenKey;

  switch (bridgeProtocol) {
    case "TOUCAN":
      projectTokenName = "tco2";
      break;
    case "C3":
      projectTokenName = "c3t";
      break;
    case "ICR":
      projectTokenName = "icr";
      break;
    default:
      projectTokenName = "tco2";
      break;
  }
  return projectTokenName;
};
