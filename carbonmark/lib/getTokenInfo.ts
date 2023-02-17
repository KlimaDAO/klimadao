import { CarbonmarkToken } from "lib/types/carbonmark";
import { StaticImageData } from "next/legacy/image";
import C3 from "public/icons/c3_token.png";
import TC02 from "public/icons/toucan_token.png";
import USDC from "public/icons/USDC.png";

type CarbonmarkTokenMap = {
  [key in CarbonmarkToken]: {
    key: string;
    icon: StaticImageData;
    label: Uppercase<CarbonmarkToken>;
  };
};

export const carbonmarkTokenInfoMap: CarbonmarkTokenMap = {
  usdc: { key: "usdc", icon: USDC, label: "USDC" },
  c3: { key: "c3", icon: C3, label: "C3" },
  tc02: { key: "tc02", icon: TC02, label: "TC02" },
};
