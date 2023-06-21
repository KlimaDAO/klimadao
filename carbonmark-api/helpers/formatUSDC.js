import { utils } from "ethers";

export const formatUSDC = (str) => {
  const decimals = process.env.VERCEL_ENV === "development" ? 18 : 6;
  return utils.formatUnits(str, decimals);
};
