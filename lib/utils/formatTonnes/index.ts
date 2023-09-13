/**
 * Round to 2nd decimal place, to localized string.
 * If the rounded value is smaller than 0.01, show 6 decimal places instead.
 * Trims trailing zeros if the minimumFractionDigits is not specified.
 * "1000.12567" => "1,000.13"
 * "1000.000" => "1,000"
 * "0.0001234" => "0.000123"
 */
export const formatTonnes = (params: {
  amount: string;
  locale: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}): string => {
  const minimumFractionDigits = params.minimumFractionDigits || 0;
  const amountNumber = Number(params.amount);
  const maximumFractionDigits =
    params.maximumFractionDigits !== undefined ? params.maximumFractionDigits : amountNumber >= 0.01 ? 2 : 6;
  return amountNumber.toLocaleString(params.locale, {
    maximumFractionDigits,
    minimumFractionDigits,
  });
};
