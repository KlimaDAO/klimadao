import { ethers, providers } from "ethers";

import { addresses } from "@klimadao/lib/constants";
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

export const changeApprovalTransaction = async (params: {
  value: string;
  provider: providers.JsonRpcProvider;
  onStatus: OnStatusHandler;
  action: "pklima" | "bct";
}) => {
  try {
    const contract = {
      pklima: getContract({
        contractName: "pklima",
        provider: params.provider.getSigner(),
      }),
      bct: getContract({
        contractName: "bct",
        provider: params.provider.getSigner(),
      }),
    }[params.action];
    const value = ethers.utils.parseUnits(params.value, 18); // BigNumber
    params.onStatus("userConfirmation", "");
    const txn = await contract.approve(
      addresses["mainnet"].pklima_exercise,
      value.toString()
    );
    params.onStatus("networkConfirmation", "");
    await txn.wait(1);
    params.onStatus("done", "Approval was successful");
    return formatUnits(value, 18);
  } catch (error: any) {
    if (error.code === 4001) {
      params.onStatus("error", "userRejected");
      throw error;
    }
    params.onStatus("error");
    throw error;
  }
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
      ethers.utils.parseUnits(params.value, "ether")
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
