import { addresses, RetirementToken, retirementTokens } from "../../constants";

const { mainnet } = addresses;

/** Type guard */
const isRetirementToken = (tkn?: string): tkn is RetirementToken => {
  if (!tkn) return false;
  return retirementTokens.includes(tkn as RetirementToken);
};

/**
 * Given the address of a RetirementToken, return the name/key
 * Returns null if not found, or not a retirement token.
 * @example getRetirementTokenByAddress(0x12345) => "mco2"
 */
export const getRetirementTokenByAddress = (
  tokenAddress: string
): RetirementToken | null => {
  const keys = Object.keys(mainnet) as (keyof typeof mainnet)[];
  const token = keys.find(
    (key) => mainnet[key].toLowerCase() === tokenAddress.toLowerCase()
  );
  return isRetirementToken(token) ? token : null;
};
