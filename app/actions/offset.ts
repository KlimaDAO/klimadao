import { ethers, providers } from "ethers";
import { Thunk } from "state";
import { setCarbonRetiredBalances, updateAllowances } from "state/user";
import { getTransactionOptions } from "@klimadao/lib/utils";

import {
  addresses,
  OffsetInputToken,
  offsetInputTokens,
  RetirementToken,
} from "@klimadao/lib/constants";
import {
  formatUnits,
  getTokenDecimals,
  createRetirementStorageContract,
  getRetirementTotalsAndBalances,
  getContract,
  getAllowance,
} from "@klimadao/lib/utils";
import { OnStatusHandler } from "./utils";

import {
  RetirementReceipt,
  RetirementTotals,
} from "@klimadao/lib/types/offset";

import { AllowancesFormatted } from "@klimadao/lib/types/allowances";

export const getRetiredOffsetBalances = (params: {
  provider: providers.JsonRpcProvider;
  address: string;
  onRPCError: () => void;
}): Thunk => {
  return async (dispatch) => {
    try {
      const retired = await getRetirementTotalsAndBalances({
        address: params.address,
      });

      dispatch(setCarbonRetiredBalances(retired));
    } catch (error: any) {
      console.error(error);
    }
  };
};

export const getRetirementAllowances = (params: {
  provider: providers.JsonRpcProvider;
  address: string;
  onRPCError: () => void;
}): Thunk => {
  return async (dispatch) => {
    try {
      // create arr of promises, one for each of the above erc20s
      const promises = offsetInputTokens.reduce((arr, val) => {
        const contract = getContract({
          contractName: val,
          provider: params.provider,
        });
        arr.push(
          getAllowance({
            contract,
            address: params.address,
            spender: "retirementAggregator",
            token: val,
          })
        );
        return arr;
      }, [] as Promise<AllowancesFormatted>[]);

      // await to get arr of Allowances
      const allAllowances = await Promise.all(promises);

      // reduce to match the state shape
      const allowances = allAllowances.reduce<AllowancesFormatted>(
        (obj, allowance) => {
          const [token, spender] = Object.entries(allowance)[0];
          obj[token as keyof typeof allowance] = {
            ...obj[token as keyof typeof allowance],
            ...spender,
          };
          return obj;
        },
        {} as AllowancesFormatted
      );

      dispatch(updateAllowances(allowances));
    } catch (error: any) {
      console.error("Error in getRetirementAllowances: ", error);
      throw error;
    }
  };
};

export const getOffsetConsumptionCost = async (params: {
  provider: providers.JsonRpcProvider;
  inputToken: OffsetInputToken;
  retirementToken: RetirementToken;
  quantity: string;
  amountInCarbon: boolean;
  getSpecific: boolean;
}): Promise<[string, string]> => {
  const retirementAggregatorContract = getContract({
    contractName: "retirementAggregator",
    provider: params.provider,
  });
  const parsed = ethers.utils.parseUnits(
    params.quantity,
    getTokenDecimals(params.retirementToken)
  );
  let sourceAmount: any;
  if (params.getSpecific) {
    sourceAmount = await retirementAggregatorContract.getSourceAmountSpecific(
      addresses["mainnet"][params.inputToken],
      addresses["mainnet"][params.retirementToken],
      parsed,
      params.amountInCarbon // amountInCarbon: bool
    );
  } else {
    sourceAmount = await retirementAggregatorContract.getSourceAmount(
      addresses["mainnet"][params.inputToken],
      addresses["mainnet"][params.retirementToken],
      parsed,
      params.amountInCarbon // amountInCarbon: bool
    );
  }

  return [
    formatUnits(sourceAmount[0], getTokenDecimals(params.inputToken)),
    formatUnits(sourceAmount[1], getTokenDecimals(params.retirementToken)),
  ];
};

export type RetireCarbonTransactionResult = {
  receipt: RetirementReceipt;
  retirementTotals: ReturnType<RetirementTotals[1]["toNumber"]>;
};

export const retireCarbonTransaction = async (params: {
  address: string;
  provider: providers.JsonRpcProvider;
  inputToken: OffsetInputToken;
  retirementToken: RetirementToken;
  quantity: string;
  amountInCarbon: boolean;
  beneficiaryAddress: string;
  beneficiaryName: string;
  retirementMessage: string;
  onStatus: OnStatusHandler;
  projectAddress: string;
}): Promise<RetireCarbonTransactionResult> => {
  try {
    // get all current retirement totals
    const storageContract = createRetirementStorageContract(params.provider);

    const [totals]: RetirementTotals =
      await storageContract.getRetirementTotals(
        params.beneficiaryAddress || params.address
      );

    // add + 1 now as this number is only passed on if transaction succeeded
    const formattedTotals = totals.toNumber();
    const retirementTotals = formattedTotals + 1;
    const transactionOptions = await getTransactionOptions();

    // retire transaction
    const retireContract = getContract({
      contractName: "retirementAggregator",
      provider: params.provider.getSigner(),
    });

    params.onStatus("userConfirmation");

    let txn;
    if (!!params.projectAddress) {
      txn = await retireContract.retireCarbonSpecific(
        addresses["mainnet"][params.inputToken],
        addresses["mainnet"][params.retirementToken],
        ethers.utils.parseUnits(
          params.quantity,
          getTokenDecimals(params.retirementToken)
        ),
        params.amountInCarbon,
        params.beneficiaryAddress || params.address,
        params.beneficiaryName,
        params.retirementMessage,
        params.projectAddress,
        transactionOptions
      );
    } else {
      txn = await retireContract.retireCarbon(
        addresses["mainnet"][params.inputToken],
        addresses["mainnet"][params.retirementToken],
        ethers.utils.parseUnits(
          params.quantity,
          getTokenDecimals(params.retirementToken)
        ),
        params.amountInCarbon,
        params.beneficiaryAddress || params.address,
        params.beneficiaryName,
        params.retirementMessage,
        transactionOptions
      );
    }

    params.onStatus("networkConfirmation");

    const receipt: RetirementReceipt = await txn.wait(1);

    return { receipt, retirementTotals };
  } catch (e: any) {
    if (e.code === 4001) {
      params.onStatus("error", "userRejected");
      throw e;
    }
    params.onStatus("error");
    console.error(e);
    throw e;
  }
};
