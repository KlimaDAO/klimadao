import { formatUnits, trimWithLocale } from "@klimadao/lib/utils";
import { BigNumber } from "ethers";

// price is always only USDC??
export const formatPrice = (value: BigNumber, locale = "en") => {
  const toNumber = Number(formatUnits(value, 18)); // ensure to change this later to 6 decimals for USDC !!
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 3,
  }).format(toNumber);
};

export const formatTonnes = (value: BigNumber, locale = "en") => {
  const toNumber = formatUnits(value, 18);
  return trimWithLocale(toNumber, 4, locale);
};
