import { verifyMessage } from "ethers-v6";
import { isString } from "lodash";
import { SIGN_PROFILE_MESSAGE } from "../app.constants";

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

/**
 * Returns true if the message signer is the targetWallet
 * Uses ECDSA under the hood to recover the signerWalletAddress
 */
export const verifyProfileSignature = (params: {
  nonce?: number;
  signature: string;
  expectedAddress: string;
}) => {
  if (!params.signature) return false;
  // Backwards-compat: nonce may be undefined, append empty string
  const expectedMessage = SIGN_PROFILE_MESSAGE + (params?.nonce || "");
  const signerWalletAddress = verifyMessage(expectedMessage, params.signature);
  return (
    signerWalletAddress.toLowerCase() === params.expectedAddress.toLowerCase()
  );
};
