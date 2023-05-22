import { formatUnits, trimWithLocale } from "@klimadao/lib/utils";
import { BigNumberish } from "ethers";
import { getTokenDecimals } from "lib/networkAware/getTokenDecimals";

/** USDC only */
export const formatBigToPrice = (value: BigNumberish, locale = "en") => {
  const toNumber = Number(formatUnits(value, getTokenDecimals("usdc")));
  return formatToPrice(toNumber, locale);
};

export const formatToPrice = (
  value: string | number,
  locale = "en",
  showSymbol = true
) => {
  const toNumber = Number(value);

  if (showSymbol) {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
    }).format(toNumber);
  }

  const currencyFractionDigits = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
  }).resolvedOptions().maximumFractionDigits;

  return toNumber.toLocaleString(locale, {
    maximumFractionDigits: currencyFractionDigits,
    minimumFractionDigits: 2,
  });
};

export const formatBigToTonnes = (value: BigNumberish, locale = "en") => {
  const toNumber = formatUnits(value, 18);
  return formatToTonnes(toNumber, locale);
};

export const formatToTonnes = (value: string | number, locale = "en") => {
  return trimWithLocale(value, 4, locale);
};

export const formatList = (
  value: string[],
  style: "long" | "short" | "narrow",
  locale = "en"
) => {
  return new Intl.ListFormat(locale, { style }).format(value);
};
