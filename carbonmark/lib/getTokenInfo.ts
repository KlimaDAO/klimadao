import { CarbonmarkToken } from "lib/types/carbonmark";
import { StaticImageData } from "next/legacy/image";
import C3 from "public/icons/c3_token.png";
import TCO2 from "public/icons/toucan_token.png";
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
  tco2: { key: "tco2", icon: TCO2, label: "TCO2" },
};
