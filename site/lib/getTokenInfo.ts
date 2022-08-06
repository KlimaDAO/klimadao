import { RetirementToken, retirementTokens } from "@klimadao/lib/constants";

import BCT from "public/icons/BCT.png";
import NCT from "public/icons/NCT.png";
import MCO2 from "public/icons/MCO2.png";
import UBO from "public/icons/UBO.png";
import NBO from "public/icons/NBO.png";

type RetirementTokenInfoMap = {
  [key in RetirementToken]: {
    key: string;
    icon: StaticImageData;
    label: Uppercase<RetirementToken>;
  };
};

export const retirementTokenInfoMap: RetirementTokenInfoMap = {
  ubo: { key: "ubo", icon: UBO, label: "UBO" },
  nbo: { key: "nbo", icon: NBO, label: "NBO" },
  bct: { key: "bct", icon: BCT, label: "BCT" },
  nct: { key: "nct", icon: NCT, label: "NCT" },
  mco2: { key: "mco2", icon: MCO2, label: "MCO2" },
};

export const allRetirementTokenInfos = retirementTokens.map((tkn) => ({
  ...retirementTokenInfoMap[tkn],
}));
