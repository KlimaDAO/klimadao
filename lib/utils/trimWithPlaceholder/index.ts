/** Returns localized string, or falls back to "loading..." if no number provided */
export const trimWithPlaceholder = (
  number: string | number | undefined,
  precision: number
) => {
  if (typeof number === "undefined" || Number.isNaN(number)) {
    return "Loading... ";
  }
  return Number(number).toLocaleString(undefined, {
    maximumFractionDigits: precision,
  });
};
