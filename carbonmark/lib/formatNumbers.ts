import { formatUnits, trimWithLocale } from "@klimadao/lib/utils";
import { BigNumber } from "ethers";
import { getTokenDecimals } from "lib/networkAware/getTokenDecimals";

/** USDC only */
export const formatBigToPrice = (value: BigNumber, locale = "en") => {
  const toNumber = Number(formatUnits(value, getTokenDecimals("usdc")));
  return formatToPrice(toNumber, locale);
};

export const formatToPrice = (value: string | number, locale = "en") => {
  const toNumber = Number(value);
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
  }).format(toNumber);
};

export const formatBigToTonnes = (value: BigNumber, locale = "en") => {
  const toNumber = formatUnits(value, 18);
  return formatToTonnes(toNumber, locale);
};

export const formatToTonnes = (value: string | number, locale = "en") => {
  return trimWithLocale(value, 4, locale);
};
