import { CarbonmarkPaymentMethod } from "lib/types/carbonmark.types";
import { StaticImageData } from "next/legacy/image";
import FIAT from "public/icons/Fiat.png";
import USDC from "public/icons/USDC.png";

export type CarbonmarkPaymentMethodMap = {
  [key in CarbonmarkPaymentMethod]: {
    id: string;
    icon: StaticImageData;
    label: Uppercase<CarbonmarkPaymentMethod> | "Credit Card";
    disabled: boolean;
  };
};

export const carbonmarkPaymentMethodMap: CarbonmarkPaymentMethodMap = {
  usdc: { id: "usdc", icon: USDC, label: "USDC", disabled: false },
  fiat: { id: "fiat", icon: FIAT, label: "Credit Card", disabled: true },
};

export const carbonmarkRetirePaymentMethodMap: CarbonmarkPaymentMethodMap = {
  usdc: { id: "usdc", icon: USDC, label: "USDC", disabled: false },
  fiat: { id: "fiat", icon: FIAT, label: "Credit Card", disabled: false },
};
