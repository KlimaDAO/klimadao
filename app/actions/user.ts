import { ethers, providers } from "ethers";
import { Thunk } from "state";

import IERC20 from "@klimadao/lib/abi/IERC20.json";
import wsKlima from "@klimadao/lib/abi/wsKlima.json";

import { addresses } from "@klimadao/lib/constants";
import { formatUnits, trimStringDecimals } from "@klimadao/lib/utils";
import {
  setBalance,
  setExerciseAllowance,
  setMigrateAllowance,
  setStakeAllowance,
  setWrapAllowance,
} from "state/user";

export const loadAccountDetails = (params: {
  provider: providers.JsonRpcProvider;
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
      const wsklimaContract = new ethers.Contract(
        addresses["mainnet"].wsklima,
        wsKlima.abi,
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

      // balances
      const bctBalance = await bctContract.balanceOf(params.address);
      const klimaBalance = await klimaContract.balanceOf(params.address);
      const sklimaBalance = await sklimaContract.balanceOf(params.address);
      const wsklimaBalance = await wsklimaContract.balanceOf(params.address);
      const aklimaBalance = await aklimaContract.balanceOf(params.address);
      const alklimaBalance = await alklimaContract.balanceOf(params.address);
      const pklimaBalance = await pKlimaContract.balanceOf(params.address);

      // allowances token.allowance(owner, spender)
      const stakeAllowance = await klimaContract.allowance(
        params.address,
        addresses["mainnet"].staking_helper
      );
      const unstakeAllowance = await sklimaContract.allowance(
        params.address,
        addresses["mainnet"].staking
      );
      const wrapAllowance = await sklimaContract.allowance(
        params.address,
        addresses["mainnet"].wsklima
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
          wsklima: trimStringDecimals(formatUnits(wsklimaBalance), 9), // trim to 9 for compat with sKLIMA contract
          aklima: formatUnits(aklimaBalance),
          pklima: formatUnits(pklimaBalance),
          alklima: formatUnits(alklimaBalance),
          bct: formatUnits(bctBalance),
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
      dispatch(
        setWrapAllowance({
          sklima: formatUnits(wrapAllowance),
          // wsklima: formatUnits(wsklimaWrapAllowance),
        })
      );
    } catch (error: any) {
      if (error.message && error.message.includes("Non-200 status code")) {
        params.onRPCError();
      }
    }
  };
};
