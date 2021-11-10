import { ethers, BigNumber } from "ethers";
import { Thunk } from "state";

import IERC20 from "@klimadao/lib/abi/IERC20.json";
import ExercisePKlima from "@klimadao/lib/abi/ExercisepKLIMA.json";

import { addresses } from "@klimadao/lib/constants";
import { trimStringDecimals } from "@klimadao/lib/utils";
import {
  setBalance,
  setExerciseAllowance,
  setMigrateAllowance,
  setPklimaTerms,
  setStakeAllowance,
} from "state/user";

/** Klima and sklima are 9 decimals, all others are 18 */
const formatUnits = (value: BigNumber, decimals: 9 | 18 = 18) => {
  return ethers.utils.formatUnits(value, decimals);
};

export const loadAccountDetails = (params: {
  provider: ethers.providers.Provider;
  address: string;
  onRPCError: () => void;
}): Thunk => {
  return async (dispatch) => {
    try {
      const bctContract = new ethers.Contract(
        addresses["mainnet"].bct,
        IERC20.abi,
        params.provider
      );
      const klimaContract = new ethers.Contract(
        addresses["mainnet"].klima,
        IERC20.abi,
        params.provider
      );
      const sklimaContract = new ethers.Contract(
        addresses["mainnet"].sklima,
        IERC20.abi,
        params.provider
      );
      const aklimaContract = new ethers.Contract(
        addresses["mainnet"].aklima,
        IERC20.abi,
        params.provider
      );
      const alklimaContract = new ethers.Contract(
        addresses["mainnet"].alklima,
        IERC20.abi,
        params.provider
      );
      const pKlimaContract = new ethers.Contract(
        addresses["mainnet"].pklima,
        IERC20.abi,
        params.provider
      );
      const pExerciseContract = new ethers.Contract(
        addresses["mainnet"].pklima_exercise,
        ExercisePKlima.abi,
        params.provider
      );

      // balances
      const bctBalance = await bctContract.balanceOf(params.address);
      const klimaBalance = await klimaContract.balanceOf(params.address);
      const sklimaBalance = await sklimaContract.balanceOf(params.address);
      const aklimaBalance = await aklimaContract.balanceOf(params.address);
      const alklimaBalance = await alklimaContract.balanceOf(params.address);
      const pklimaBalance = await pKlimaContract.balanceOf(params.address);
      const pklimaRedeemBalance = await pExerciseContract.redeemableFor(
        params.address
      );
      const rawPklimaTerms = await pExerciseContract.terms(params.address);

      // allowances
      const stakeAllowance = await klimaContract.allowance(
        params.address,
        addresses["mainnet"].staking_helper
      );
      const unstakeAllowance = await sklimaContract.allowance(
        params.address,
        addresses["mainnet"].staking
      );
      const aKlimaAllowance = await aklimaContract.allowance(
        params.address,
        addresses["mainnet"].aklima_migrate
      );
      const alKlimaAllowance = await alklimaContract.allowance(
        params.address,
        addresses["mainnet"].alklima_migrate
      );
      const pKlimaAllowance = await pKlimaContract.allowance(
        params.address,
        addresses["mainnet"].pklima_exercise
      );
      const bctAllowance = await bctContract.allowance(
        params.address,
        addresses["mainnet"].pklima_exercise
      );

      dispatch(
        setBalance({
          klima: formatUnits(klimaBalance, 9),
          sklima: formatUnits(sklimaBalance, 9),
          aklima: formatUnits(aklimaBalance),
          pklima: formatUnits(pklimaBalance),
          alklima: formatUnits(alklimaBalance),
          bct: formatUnits(bctBalance),
        })
      );
      dispatch(
        setPklimaTerms({
          claimed: formatUnits(rawPklimaTerms.claimed),
          max: formatUnits(rawPklimaTerms.max),
          supplyShare: rawPklimaTerms.percent / 10000,
          redeemable: trimStringDecimals(
            formatUnits(pklimaRedeemBalance),
            9 // redeemableFor() returns 18 decimals, but KLIMA token only supports 9
          ),
        })
      );
      dispatch(
        setMigrateAllowance({
          aklima: formatUnits(aKlimaAllowance),
          alklima: formatUnits(alKlimaAllowance),
        })
      );
      dispatch(
        setStakeAllowance({
          klima: formatUnits(stakeAllowance, 9),
          sklima: formatUnits(unstakeAllowance, 9),
        })
      );
      dispatch(
        setExerciseAllowance({
          bct: formatUnits(bctAllowance),
          pklima: formatUnits(pKlimaAllowance),
        })
      );
    } catch (error: any) {
      if (error.message && error.message.includes("Non-200 status code")) {
        params.onRPCError();
      }
    }
  };
};
