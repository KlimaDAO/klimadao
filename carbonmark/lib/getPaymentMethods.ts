import { CarbonmarkPaymentMethod } from "lib/types/carbonmark.types";
import { StaticImageData } from "next/image";
import BANK from "public/icons/Bank.png";
import FIAT from "public/icons/Fiat.png";
import USDC from "public/icons/USDC.png";

export type CarbonmarkPaymentMethodMap = {
  [key in CarbonmarkPaymentMethod]: {
    id: CarbonmarkPaymentMethod;
    icon: StaticImageData;
    label: Uppercase<CarbonmarkPaymentMethod> | "Credit Card" | "Bank Transfer"| "USDC.e";
    disabled: boolean;
  };
};

export const carbonmarkPaymentMethodMap: CarbonmarkPaymentMethodMap = {
  usdc: { id: "usdc", icon: USDC, label: "USDC.e", disabled: false },
  fiat: { id: "fiat", icon: FIAT, label: "Credit Card", disabled: true },
  "bank-transfer": {
    id: "bank-transfer",
    icon: BANK,
    label: "Bank Transfer",
    disabled: true,
  },
};

export const carbonmarkRetirePaymentMethodMap: CarbonmarkPaymentMethodMap = {
  fiat: { id: "fiat", icon: FIAT, label: "Credit Card", disabled: false },
  usdc: { id: "usdc", icon: USDC, label: "USDC.e", disabled: false },
  "bank-transfer": {
    id: "bank-transfer",
    icon: BANK,
    label: "Bank Transfer",
    disabled: false,
  },
};
