import { ethers } from "ethers";

import { Thunk } from "state";
import { setAppState } from "state/app";

import {
  getEstimatedDailyRebases,
  getTreasuryBalance,
  fetchBlockRate,
  getJsonRpcProvider,
} from "@klimadao/lib/utils";
import { addresses } from "@klimadao/lib/constants";
import DistributorContractv4 from "@klimadao/lib/abi/DistributorContractv4.json";
import SKlima from "@klimadao/lib/abi/sKlima.json";
import IERC20 from "@klimadao/lib/abi/IERC20.json";

export const loadAppDetails = (params: { onRPCError: () => void }): Thunk => {
  return async (dispatch) => {
    const provider = getJsonRpcProvider();
    try {
      const currentBlock = await provider.getBlockNumber();

      const distributorContract = new ethers.Contract(
        addresses["mainnet"].distributor,
        DistributorContractv4.abi,
        provider
      );
      const sKlimaContract = new ethers.Contract(
        addresses["mainnet"].sklima,
        IERC20.abi,
        provider
      );
      const sKlimaMainContract = new ethers.Contract(
        addresses["mainnet"].sklima,
        SKlima.abi,
        provider
      );

      const promises = [
        distributorContract.info(0),
        sKlimaMainContract.circulatingSupply(),
        sKlimaContract.balanceOf("0x693aD12DbA5F6E07dE86FaA21098B691F60A1BEa"),
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
      const stakingAnnualPercent = Math.pow(
        1 + stakingRebase,
        365 * estimatedDailyRebases
      );

      dispatch(
        setAppState({
          currentIndex: ethers.utils.formatUnits(currentIndex, "gwei"),
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
