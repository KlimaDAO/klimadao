import { ethers, BigNumber } from "ethers";

/** Klima and sklima are 9 decimals, USDC 6, all others 18 */
export const formatUnits = (value: BigNumber, decimals: 6 | 9 | 18 = 18) => {
  return ethers.utils.formatUnits(value, decimals);
};
