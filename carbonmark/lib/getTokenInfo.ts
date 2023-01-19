import { StaticImageData } from "next/legacy/image";
import USDC from "public/icons/USDC.png";

export type CarbonmarkToken = "usdc"; // what are the others?

type CarbonmarkTokenMap = {
  [key in CarbonmarkToken]: {
    key: string;
    icon: StaticImageData;
    label: Uppercase<CarbonmarkToken>;
  };
};

export const carbonmarkTokenInfoMap: CarbonmarkTokenMap = {
  usdc: { key: "usdc", icon: USDC, label: "USDC" },
};
