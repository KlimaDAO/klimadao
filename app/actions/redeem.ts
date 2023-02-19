import { getStaticProvider, getTransactionOptions } from "@klimadao/lib/utils";
import { providers, utils } from "ethers";
import { Thunk } from "state";
import { updateAllowances } from "state/user";

import { addresses } from "@klimadao/lib/constants";
import {
  formatUnits,
  getContract,
  getTokenDecimals,
} from "@klimadao/lib/utils";

import { offsetInputTokens } from "@klimadao/lib/constants";
import { getAllowance } from "@klimadao/lib/utils";
import { OnStatusHandler } from "./utils";

import { AllowancesFormatted } from "@klimadao/lib/types/allowances";

export const getRedeemCost = async (params): Promise<string> => {
  const retirementAggregatorV2Contract = getContract({
    contractName: "retirementAggregatorV2",
    provider: getStaticProvider(),
  });

  const parsed = utils.parseUnits(params.quantity.toString(), 18);

  const sourceAmount =
    await retirementAggregatorV2Contract.getSourceAmountSpecificRedeem(
      addresses.mainnet[params.paymentMethod],
      addresses.mainnet[params.retirementToken],
      [parsed.toString()]
    );

  return formatUnits(sourceAmount, getTokenDecimals(params.paymentMethod));
};

// TODO review
export const getRedeemAllowances = (params: {
  address: string;
  onRPCError: () => void;
}): Thunk => {
  return async (dispatch) => {
    try {
      // create arr of promises, one for each of the above erc20s
      const promises = offsetInputTokens.reduce((arr, val) => {
        const contract = getContract({
          contractName: val,
          provider: getStaticProvider(),
        });
        arr.push(
          getAllowance({
            contract,
            address: params.address,
            spender: "retirementAggregatorV2",
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
      console.error("Error in getRedeemAllowances: ", error);
      throw error;
    }
  };
};

export const redeemCarbonTransaction = async (params: {
  paymentMethod: string;
  poolToken: string;
  maxAmountIn: string;
  projectAddress: string;
  amount: string;
  provider: providers.JsonRpcProvider;
  onStatus: OnStatusHandler;
}) => {
  try {
    const transactionOptions = await getTransactionOptions();

    // retire transaction
    const redeemContract = getContract({
      contractName: "retirementAggregatorV2",
      provider: getStaticProvider(),
    });

    params.onStatus("userConfirmation");

    let txn;
    if (params.carbonPool === "bct" || params.carbonPool === "nct") {
      // toucanRedeemExactCarbonPoolSpecific
      txn = await redeemContract.toucanRedeemExactCarbonPoolSpecific(
        params.paymentMethod,
        params.poolToken,
        params.maxAmountIn,
        [params.projectAddress],
        [params.amount],
        transactionOptions // is this correct??
      );
    } else if (params.carbonPool === "ubo" || params.carbonPool === "nbo") {
      // c3RedeemPoolSpecific
      txn = await redeemContract.c3RedeemPoolSpecific(
        params.paymentMethod,
        params.poolToken,
        params.maxAmountIn,
        [params.projectAddress],
        [params.amount],
        transactionOptions
      );
    }

    params.onStatus("networkConfirmation");

    const receipt = await txn.wait(1);

    return { receipt };
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
