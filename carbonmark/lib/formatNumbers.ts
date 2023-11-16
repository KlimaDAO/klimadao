import { trimWithLocale } from "@klimadao/lib/utils";

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

export const formatToTonnes = (
  value: string | number,
  locale = "en",
  decimals = 4
) => {
  return trimWithLocale(value, decimals, locale);
};

export const formatList = (
  value: string[],
  style: "long" | "short" | "narrow",
  locale = "en"
) => {
  return new Intl.ListFormat(locale, { style }).format(value);
};

export const formatToDecimals = (value: number, minimumFractionDigits = 1) => {
  return new Intl.NumberFormat(navigator.language, {
    minimumFractionDigits,
  }).format(value);
};
