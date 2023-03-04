/**
 * Round to 2nd decimal place, to localized string.
 * If the rounded value is smaller than 0.01, show 6 decimal places instead.
 * Trims trailing zeros.
 * "1000.12567" => "1,000.13"
 * "1000.000" => "1,000"
 * "0.0001234" => "0.000123"
 */
export const formatTonnes = (params: {
  amount: string;
  locale: string;
}): string => {
  const amountNumber = Number(params.amount);
  const maximumFractionDigits = amountNumber >= 0.01 ? 2 : 6;
  return amountNumber.toLocaleString(params.locale, {
    maximumFractionDigits,
  });
};
