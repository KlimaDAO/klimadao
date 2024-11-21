export const formatTokenAmount = (value: number, decimals = 18): string => {
  if (!value || isNaN(value)) return "0";

  // Convert to string to avoid scientific notation
  const valueStr = value.toFixed(decimals);

  // Find first non-zero digit after decimal
  const firstNonZero = valueStr.slice(2).search(/[1-9]/);

  if (firstNonZero === -1) {
    // If no non-zero digits found
    return "0";
  }

  // For very small numbers, show up to the first 4 significant digits
  if (value < 0.0001) {
    const significantDigits = 4;
    const endIndex = Math.min(firstNonZero + significantDigits, decimals);

    return valueStr.slice(0, endIndex + 2); // +2 for "0."
  }

  // For normal numbers, use standard formatting with up to 6 decimal places
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
    useGrouping: true,
  });
};

export const formatUSD = (value: number, showZeroBalance = false): string => {
  if (!showZeroBalance && (!value || isNaN(value))) return "$ -";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};
