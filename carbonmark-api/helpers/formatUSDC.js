import { utils } from "ethers";

export const formatUSDC = (str) => {
  const decimals = process.env.VERCEL_ENV === "production" ? 6 : 18;
  return utils.formatUnits(str, decimals);
};
