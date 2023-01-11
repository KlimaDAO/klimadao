import { getContract, getEstimatedDailyRebases, getStaticProvider } from "..";

export const getStakingRewards = async (params: {
  days: number;
  blockRate: number;
  infuraId?: string;
}): Promise<number> => {
  const provider = getStaticProvider({
    chain: "polygon",
    infuraId: params.infuraId,
  });
  const distributorContract = getContract({
    contractName: "distributor",
    provider,
  });
  const sklimaContract = getContract({
    contractName: "sklimaMain",
    provider,
  });

  const circSupply = await sklimaContract.circulatingSupply();
  const info = await distributorContract.info(0);
  const stakingReward = await distributorContract.nextRewardAt(info.rate);

  const estimatedDailyRebases = getEstimatedDailyRebases(params.blockRate);

  const stakingRebase = stakingReward / circSupply;
  const stakingRewards = Math.pow(
    1 + stakingRebase,
    params.days * estimatedDailyRebases
  );
  return Number(((stakingRewards - 1) * 100).toFixed(2));
};
