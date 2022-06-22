import { ethers } from "ethers";
import { getJsonRpcProvider } from "../getJsonRpcProvider";
import { addresses } from "../../constants";
import { getEstimatedDailyRebases, getContract } from "..";
import SKlima from "../../abi/sKlima.json";

export const getStakingRewards = async (params: {
  days: number;
  blockRate: number;
  providerUrl?: string;
}): Promise<number> => {
  const provider = getJsonRpcProvider(params.providerUrl);
  const distributorContract = getContract({
    contractName: "distributor",
    provider,
  });
  const sklimaContract = new ethers.Contract(
    addresses.mainnet.sklima,
    SKlima.abi,
    provider
  );
  const circSupply = await sklimaContract.circulatingSupply();
  const info = await distributorContract.info(0);
  const stakingReward = await distributorContract.nextRewardAt(info.rate);

  const estimatedDailyRebases = getEstimatedDailyRebases(params.blockRate);

  const stakingRebase = stakingReward / circSupply;
  const stakingRewards = Math.pow(
    1 + stakingRebase,
    params.days * estimatedDailyRebases
  );
  return Math.floor((stakingRewards - 1) * 100);
};
