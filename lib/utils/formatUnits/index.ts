import { ethers, BigNumber } from "ethers";

/** Klima and sklima are 9 decimals, all others are 18 */
export const formatUnits = (value: BigNumber, decimals: 9 | 18 = 18) => {
  return ethers.utils.formatUnits(value, decimals);
};
