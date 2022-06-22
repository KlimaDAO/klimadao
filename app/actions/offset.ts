import { ethers, providers } from "ethers";
import { Thunk } from "state";
import {
  setCarbonRetiredAllowance,
  setCarbonRetiredBalances,
} from "state/user";

import KlimaRetirementAggregator from "@klimadao/lib/abi/KlimaRetirementAggregator.json";
import {
  addresses,
  InputToken,
  inputTokens,
  RetirementToken,
} from "@klimadao/lib/constants";
import {
  formatUnits,
  getTokenDecimals,
  createRetirementStorageContract,
  getRetirementTotalsAndBalances,
  getContractByToken,
} from "@klimadao/lib/utils";
import { OnStatusHandler } from "./utils";

import {
  RetirementReceipt,
  RetirementTotals,
} from "@klimadao/lib/types/offset";

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
      const promises = inputTokens.reduce((arr, val) => {
        const contract = getContractByToken({
          token: val,
          provider: params.provider,
        });
        arr.push(
          contract.allowance(
            params.address, // owner
            addresses["mainnet"].retirementAggregator // spender
          )
        );
        return arr;
      }, [] as Promise<ethers.BigNumber>[]);

      type Allowances = { [key in typeof inputTokens[number]]: string };

      // await to get arr of bignumbers
      const res = await Promise.all(promises);

      // reduce and format each with appropriate decimals
      const allowances = inputTokens.reduce<Allowances>((obj, tkn, index) => {
        const val = res[index];
        const decimals = getTokenDecimals(tkn);
        obj[tkn] = formatUnits(val, decimals);
        return obj;
      }, {} as Allowances);
      dispatch(setCarbonRetiredAllowance(allowances));
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  };
};

export const changeApprovalTransaction = async (params: {
  provider: providers.JsonRpcProvider;
  token: InputToken;
  onStatus: OnStatusHandler;
}): Promise<string> => {
  try {
    const contract = getContractByToken({
      token: params.token,
      provider: params.provider,
    });
    const decimals = getTokenDecimals(params.token);
    const value = ethers.utils.parseUnits("1000000000", decimals);
    params.onStatus("userConfirmation", "");
    const txn = await contract.approve(
      addresses["mainnet"].retirementAggregator,
      value.toString()
    );
    params.onStatus("networkConfirmation", "");
    await txn.wait(1);
    params.onStatus("done", "Approval was successful");
    return formatUnits(value, decimals);
  } catch (error: any) {
    if (error.code === 4001) {
      params.onStatus("error", "userRejected");
      throw error;
    }
    params.onStatus("error");
    console.error(error);
    throw error;
  }
};

export const getOffsetConsumptionCost = async (params: {
  provider: providers.JsonRpcProvider;
  inputToken: InputToken;
  retirementToken: RetirementToken;
  quantity: string;
  amountInCarbon: boolean;
  getSpecific: boolean;
}): Promise<[string, string]> => {
  const retirementAggregatorContract = new ethers.Contract(
    addresses["mainnet"].retirementAggregator,
    KlimaRetirementAggregator.abi,
    params.provider
  );
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
  inputToken: InputToken;
  retirementToken: RetirementToken;
  quantity: string;
  amountInCarbon: boolean;
  beneficiaryAddress: string;
  beneficiaryName: string;
  retirementMessage: string;
  onStatus: OnStatusHandler;
  specificAddresses: string[];
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

    // retire transaction
    const retireContract = new ethers.Contract(
      addresses["mainnet"].retirementAggregator,
      KlimaRetirementAggregator.abi,
      params.provider.getSigner()
    );

    params.onStatus("userConfirmation");

    let txn;
    if (!!params.specificAddresses.length) {
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
        params.specificAddresses
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
        params.retirementMessage
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
