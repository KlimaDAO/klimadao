/** Returns localized string */
export const trimWithLocale = (
  number: string | number,
  precision: number,
  locale = "en"
) => {
  return Number(number).toLocaleString(locale, {
    maximumFractionDigits: precision,
  });
};
