// This function generates a random nonce (number used once) by creating a random number,
// adding 1 to it, converting it to a base-36 string, and then removing the first two characters.

import { isString } from "lodash";

// The resulting string can be used as a unique identifier for a single-use purpose.
export const generateNonce = () =>
  (Math.random() + 1).toString(36).substring(2);

const USDC_DECIMALS = 6;

/**
 * Safely convert a bigint or string value to formatted decimal string
 * Trailing zeros are not removed
 * @example
 * formatUSDC(BigInt("1234567")) // "1.234567"
 * formatUSDC("1234567") // "1.234567"
 * formatUSDC("10") // "0.000010"
 */
export const formatUSDC = (n: bigint | string): string => {
  const value = isString(n) ? BigInt(n) : n;
  const divisor = BigInt(10 ** USDC_DECIMALS); // 1000000
  const quotient = value / divisor; // 2000010n / 1000000n = 2n
  const remainder = value % divisor; // 2000010n % 1000000n = 10n
  const remainderString = remainder.toString().padStart(USDC_DECIMALS, "0"); // 10n -> "000010"
  return `${quotient}.${remainderString}`;
};
