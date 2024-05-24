export const formatTonnes = (params: {
  amount: string;
  locale: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}): string => {
  const minimumFractionDigits = params.minimumFractionDigits || 0;
  const amountNumber = Number(params.amount);
  const maximumFractionDigits =
    params.maximumFractionDigits !== undefined
      ? params.maximumFractionDigits
      : amountNumber >= 0.01
      ? 2
      : 6;
  return amountNumber.toLocaleString(params.locale, {
    maximumFractionDigits,
    minimumFractionDigits,
  });
};
