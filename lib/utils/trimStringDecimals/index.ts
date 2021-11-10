/**
 * @param {string} str
 * @param {number} precision
 * @returns {string} trimmed string
 * @example trimStringDecimals("0.12345", 2); // "0.12"
 */
export const trimStringDecimals = (str: string, precision: number) => {
  if (!str || !str.includes(".")) {
    return str;
  }
  const [integer, decimals] = str.split(".");
  if (decimals.length <= precision) {
    return str;
  }
  return `${integer}.${decimals.slice(0, precision)}`;
};
