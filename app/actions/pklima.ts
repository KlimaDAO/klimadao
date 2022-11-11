import { utils, providers } from "ethers";

import { OnStatusHandler } from "./utils";
import { Thunk } from "state";
import { setPklimaTerms } from "state/user";
import {
  formatUnits,
  trimStringDecimals,
  getContract,
} from "@klimadao/lib/utils";

export const loadTerms = (params: {
  address: string;
  provider: providers.JsonRpcProvider;
  onStatus: OnStatusHandler;
}): Thunk => {
  return async (dispatch) => {
    try {
      const pExerciseContract = getContract({
        contractName: "pklima_exercise",
        provider: params.provider,
      });
      const pklimaRedeemBalance = await pExerciseContract.redeemableFor(
        params.address
      );
      const rawPklimaTerms = await pExerciseContract.terms(params.address);
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
    } catch (error: any) {
      if (error.code === 4001) {
        params.onStatus("error", "userRejected");
        throw error;
      }
      if (error && JSON.stringify(error).includes("subtraction")) {
        params.onStatus("claimExceeded", "");
        throw error;
      }
      params.onStatus("error");
      throw error;
    }
  };
};

export const exerciseTransaction = async (params: {
  value: string;
  provider: providers.JsonRpcProvider;
  onStatus: OnStatusHandler;
}) => {
  try {
    const contract = getContract({
      contractName: "pklima_exercise",
      provider: params.provider.getSigner(),
    });
    params.onStatus("userConfirmation", "");
    const txn = await contract.exercise(
      utils.parseUnits(params.value, "ether")
    );
    params.onStatus("networkConfirmation", "");
    await txn.wait(1);
    params.onStatus("done", "Transaction was successful");
    return params.value;
  } catch (error: any) {
    if (error.code === 4001) {
      params.onStatus("error", "userRejected");
      throw error;
    }
    if (error && JSON.stringify(error).includes("subtraction")) {
      params.onStatus("claimExceeded", "");
      throw error;
    }
    params.onStatus("error");
    throw error;
  }
};
