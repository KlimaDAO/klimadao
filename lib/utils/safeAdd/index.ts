import { utils } from "ethers";

/** Safely add two stringified numbers (up to 18 decimals), returns a formatted string */
export const safeAdd = (n1: string, n2: string): string => {
  const bn1 = utils.parseUnits(n1, 18);
  const bn2 = utils.parseUnits(n2, 18);
  const result = bn1.add(bn2);
  return utils.formatUnits(result, 18);
};
