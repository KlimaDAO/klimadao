import { CarbonmarkPaymentMethod } from "lib/types/carbonmark";
import { StaticImageData } from "next/legacy/image";
import USDC from "public/icons/USDC.png";

export type CarbonmarkPaymentMethodMap = {
  [key in CarbonmarkPaymentMethod]: {
    id: string;
    icon: StaticImageData;
    label: Uppercase<CarbonmarkPaymentMethod>;
  };
};

export const carbonmarkPaymentMethodMap: CarbonmarkPaymentMethodMap = {
  usdc: { id: "usdc", icon: USDC, label: "USDC" },
};
