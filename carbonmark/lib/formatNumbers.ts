import { formatUnits, trimWithLocale } from "@klimadao/lib/utils";
import { BigNumber } from "ethers";

// price is always only USDC??
export const formatBigToPrice = (value: BigNumber, locale = "en") => {
  const toNumber = Number(formatUnits(value, 18)); // TODO: ensure to change this later to 6 decimals for USDC !!
  return formatToPrice(toNumber, locale);
};

export const formatToPrice = (value: string | number, locale = "en") => {
  const toNumber = Number(value);
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 3,
  }).format(toNumber);
};

export const formatBigToTonnes = (value: BigNumber, locale = "en") => {
  const toNumber = formatUnits(value, 18);
  return formatToTonnes(toNumber, locale);
};

export const formatToTonnes = (value: string | number, locale = "en") => {
  return trimWithLocale(value, 4, locale);
};
