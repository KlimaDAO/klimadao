import { ethers, providers } from "ethers";

import { Thunk } from "state";
import { setAppState } from "state/app";

import { getTreasuryBalance } from "@klimadao/lib/utils";
import { addresses, ESTIMATED_DAILY_REBASES } from "@klimadao/lib/constants";
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

      const promises = [
        distributorContract.info(0),
        sKlimaMainContract.circulatingSupply(),
        sKlimaContract.balanceOf("0x693aD12DbA5F6E07dE86FaA21098B691F60A1BEa"),
        getTreasuryBalance(),
        distributorContract.nextEpochBlock(),
      ];
      const [info, circSupply, currentIndex, treasuryBalance, rebaseBlock] =
        await Promise.all(promises);

      const promises2 = [distributorContract.nextRewardAt(info.rate)];

      const [stakingReward] = await Promise.all(promises2);

      const stakingRebase = stakingReward / circSupply;
      const fiveDayRate =
        Math.pow(1 + stakingRebase, 5 * ESTIMATED_DAILY_REBASES) - 1;
      const stakingAPY = Math.pow(
        1 + stakingRebase,
        365 * ESTIMATED_DAILY_REBASES
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
