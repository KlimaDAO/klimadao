import { ethers, providers } from "ethers";

import { Thunk } from "state";
import { setAppState } from "state/app";

import {
  getEstimatedDailyRebases,
  getTreasuryBalance,
} from "@klimadao/lib/utils";
import { addresses } from "@klimadao/lib/constants";
import DistributorContractv4 from "@klimadao/lib/abi/DistributorContractv4.json";
import SKlima from "@klimadao/lib/abi/sKlima.json";
import IERC20 from "@klimadao/lib/abi/IERC20.json";

export const loadAppDetails = (params: {
  provider: providers.JsonRpcProvider;
  onRPCError: () => void;
}): Thunk => {
  return async (dispatch) => {
    try {
      const currentBlock = await params.provider.getBlockNumber();

      const distributorContract = new ethers.Contract(
        addresses["mainnet"].distributor,
        DistributorContractv4.abi,
        params.provider
      );
      const sKlimaContract = new ethers.Contract(
        addresses["mainnet"].sklima,
        IERC20.abi,
        params.provider
      );
      const sKlimaMainContract = new ethers.Contract(
        addresses["mainnet"].sklima,
        SKlima.abi,
        params.provider
      );
      // Set up for testing, needs to be cached first
      const getBlockRate = async () => {
        const response = await fetch("/api/block-rate");
        const data = await response.json();
        return data.blockRate30Day;
      };

      const promises = [
        distributorContract.info(0),
        sKlimaMainContract.circulatingSupply(),
        sKlimaContract.balanceOf("0x693aD12DbA5F6E07dE86FaA21098B691F60A1BEa"),
        getTreasuryBalance(),
        distributorContract.nextEpochBlock(),
        getBlockRate(),
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
      const stakingAPY = Math.pow(
        1 + stakingRebase,
        365 * estimatedDailyRebases
      );

      dispatch(
        setAppState({
          currentIndex: ethers.utils.formatUnits(currentIndex, "gwei"),
          currentBlock,
          fiveDayRate,
          stakingAPY,
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
export const setLocale = (locale: string): Thunk => {
  return (dispatch) => {
    dispatch(
      setAppState({
        locale,
      })
    );
  };
};
