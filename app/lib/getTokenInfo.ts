import { AllowancesToken } from "@klimadao/lib/types/allowances";
import { StaticImageData } from "next/image";

import {
  BCTIcon,
  KLIMABCTLPIcon,
  KLIMAIcon,
  KLIMAMCO2LPIcon,
  KLIMAUSDCLPIcon,
  MCO2Icon,
  NBOIcon,
  NCTIcon,
  UBOIcon,
  USDCIcon,
} from "@klimadao/lib/resources";

type TokenInfoMap = {
  [key in AllowancesToken]: {
    key: string;
    icon: StaticImageData;
    label: string;
  };
};

export const tokenInfo: TokenInfoMap = {
  ubo: { key: "ubo", icon: UBOIcon, label: "UBO" },
  nbo: { key: "nbo", icon: NBOIcon, label: "NBO" },
  bct: { key: "bct", icon: BCTIcon, label: "BCT" },
  nct: { key: "nct", icon: NCTIcon, label: "NCT" },
  mco2: { key: "mco2", icon: MCO2Icon, label: "MCO2" },
  usdc: { key: "usdc", icon: USDCIcon, label: "USDC.e" }, // USDC.e
  klima: { key: "klima", icon: KLIMAIcon, label: "KLIMA" },
  sklima: { key: "sklima", icon: KLIMAIcon, label: "sKLIMA" },
  wsklima: { key: "wsklima", icon: KLIMAIcon, label: "wsKLIMA" },
  pklima: { key: "pklima", icon: KLIMAIcon, label: "pklima" },
  klimaUsdcLp: {
    key: "klimaUsdcLp",
    icon: KLIMAUSDCLPIcon,
    label: "KLIMA/USDC.e LP",
  },
  klimaBctLp: {
    key: "klimaBctLp",
    icon: KLIMABCTLPIcon,
    label: "KLIMA/BCT LP",
  },
  klimaMco2Lp: {
    key: "klimaMco2Lp",
    icon: KLIMAMCO2LPIcon,
    label: "KLIMA/MCO2 LP",
  },
};
