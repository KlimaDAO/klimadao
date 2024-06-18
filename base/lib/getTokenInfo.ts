import { BCTIcon, KLIMAIcon } from "@klimadao/lib/resources";

export type RedeemablePoolToken = "bct" | "nct" | "ubo" | "nbo";

export const tokenInfoMap = {
  bct: { key: "bct", icon: BCTIcon, label: "BCT" },
  klima: { key: "klima", icon: KLIMAIcon, label: "KLIMA" },
};
