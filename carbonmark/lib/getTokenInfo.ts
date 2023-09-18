import { CarbonToken } from "@klimadao/lib/constants";
import { CarbonmarkToken } from "lib/types/carbonmark.types";
import { StaticImageData } from "next/legacy/image";
import BCT from "public/icons/BCT.png";
import C3T from "public/icons/C3T.png";
import MCO2 from "public/icons/MCO2.png";
import NBO from "public/icons/NBO.png";
import NCT from "public/icons/NCT.png";
import TCO2 from "public/icons/TCO2.png";
import UBO from "public/icons/UBO.png";
import USDC from "public/icons/USDC.png";

export type CarbonmarkTokenMap = {
  [key in CarbonmarkToken]: {
    key: string;
    icon: StaticImageData;
    label: Uppercase<CarbonmarkToken>;
  };
};

type CarbonTokenInfoMap = {
  [key in CarbonToken]: {
    key: string;
    icon: StaticImageData;
    label: Uppercase<CarbonToken>;
  };
};

export const carbonmarkTokenInfoMap: CarbonmarkTokenMap = {
  usdc: { key: "usdc", icon: USDC, label: "USDC" },
  c3: { key: "c3", icon: C3T, label: "C3" },
  tco2: { key: "tco2", icon: TCO2, label: "TCO2" },
};

export const carbonTokenInfoMap: CarbonTokenInfoMap = {
  ubo: { key: "ubo", icon: UBO, label: "UBO" },
  nbo: { key: "nbo", icon: NBO, label: "NBO" },
  bct: { key: "bct", icon: BCT, label: "BCT" },
  nct: { key: "nct", icon: NCT, label: "NCT" },
  mco2: { key: "mco2", icon: MCO2, label: "MCO2" },
  tco2: { key: "tco2", icon: TCO2, label: "TCO2" },
  c3t: { key: "c3t", icon: C3T, label: "C3T" },
};
