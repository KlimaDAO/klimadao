import { ethers, BigNumber } from "ethers";

// Converts BigNumber to an integer (number) at the given unit
export const getInteger = (num: BigNumber, unit: string | number = "ether") => {
  const str = ethers.utils.formatUnits(num, unit);
  return Math.floor(Number(str));
};
