import { utils } from "ethers";

import { Thunk } from "state";
import { setAppState } from "state/app";

import {
  fetchBlockRate,
  getContract,
  getEstimatedDailyRebases,
  getStaticProvider,
  getTreasuryBalance,
} from "@klimadao/lib/utils";

export const loadAppDetails = (params: { onRPCError: () => void }): Thunk => {
  return async (dispatch) => {
    const provider = getStaticProvider({ batchRequests: true });
    try {
      const currentBlock = await provider.getBlockNumber();

      const distributorContract = getContract({
        contractName: "distributor",
        provider: provider,
      });
      const sKlimaMainContract = getContract({
        contractName: "sklimaMain",
        provider: provider,
      });
      const stakingContract = getContract({
        contractName: "staking",
        provider: provider,
      });

      const promises = [
        distributorContract.info(0),
        sKlimaMainContract.circulatingSupply(),
        stakingContract.index(),
        getTreasuryBalance(),
        distributorContract.nextEpochBlock(),
        fetchBlockRate(),
      ];
      const [
        info,
        circSupply,
        currentIndex,
        treasuryBalance,
        rebaseBlock,
        blockRate,
      ] = await Promise.all(promises);

      const promises2 = [distributorContract.nextRewardAt(info.rate)];

      const [stakingReward] = await Promise.all(promises2);

      const estimatedDailyRebases = getEstimatedDailyRebases(blockRate);
      const stakingRebase = stakingReward / circSupply;
      const fiveDayRate =
        Math.pow(1 + stakingRebase, 5 * estimatedDailyRebases) - 1;
      const stakingAnnualPercent =
        Math.pow(1 + stakingRebase, 365 * estimatedDailyRebases) - 1;

      dispatch(
        setAppState({
          currentIndex: utils.formatUnits(currentIndex, "gwei"),
          currentBlock,
          fiveDayRate,
          stakingAnnualPercent,
          stakingRebase,
          treasuryBalance,
          rebaseBlock: rebaseBlock.toNumber(),
          blockRate,
        })
      );
    } catch (error: any) {
      console.error(error);
      if (error.message && error.message.includes("Non-200 status code")) {
        params.onRPCError();
      }
    }
  };
};
