import { addresses } from "@klimadao/lib/constants";
import { AllowancesFormatted } from "@klimadao/lib/types/allowances";
import {
  getAllowance,
  getContract,
  getTokenDecimals,
  safeAdd,
} from "@klimadao/lib/utils";
import { providers } from "ethers";
import { parseUnits } from "ethers-v6";
import { formatUnits } from "ethers/lib/utils";
import {
  RedeemPaymentMethod,
  RedeemablePoolToken,
  redeemPaymentMethods,
} from "lib/hooks/useRedeemParams";
import { getStaticProvider } from "lib/networkAware/getStaticProvider";
import { Thunk } from "state";
import { updateAllowances } from "state/user";
import { OnStatusHandler } from "./utils";

export const getRedeemAllowances = (params: {
  address: string;
  onRPCError: () => void;
}): Thunk => {
  return async (dispatch) => {
    try {
      const promises = redeemPaymentMethods.reduce((arr, val) => {
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
  provider: providers.JsonRpcProvider;
  paymentMethod: RedeemPaymentMethod;
  pool: RedeemablePoolToken;
  projectTokenAddress: string;
  maxCost: string;
  quantity: string;
  onStatus: OnStatusHandler;
}) => {
  try {
    // redeem transaction
    const aggregator = getContract({
      contractName: "retirementAggregatorV2",
      provider: params.provider.getSigner(),
    });
    const method =
      params.pool === "nct" || params.pool === "bct"
        ? "toucanRedeemExactCarbonPoolSpecific"
        : "c3RedeemPoolSpecific";

    params.onStatus("userConfirmation");
    const txn = await aggregator[method](
      addresses["mainnet"][params.paymentMethod],
      addresses["mainnet"][params.pool],
      parseUnits(params.maxCost, getTokenDecimals(params.paymentMethod)),
      [params.projectTokenAddress],
      [parseUnits(params.quantity, 18)],
      0,
      0
    );

    params.onStatus("networkConfirmation");
    await txn.wait(1);
    params.onStatus("done");
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

export const getRedeemCost = async (params: {
  paymentMethod: RedeemPaymentMethod;
  pool: RedeemablePoolToken;
  quantity: string;
}): Promise<string> => {
  const aggregator = getContract({
    contractName: "retirementAggregatorV2",
    provider: getStaticProvider(),
  });
  const amount = await aggregator.getSourceAmountSpecificRedeem(
    addresses["mainnet"][params.paymentMethod],
    addresses["mainnet"][params.pool],
    [parseUnits(params.quantity, 18)]
  );
  const decimals = getTokenDecimals(params.paymentMethod);
  const value = formatUnits(amount, decimals);
  const valueWithSlippage = safeAdd(
    value,
    (Number(value) * 0.005).toFixed(decimals)
  );
  return valueWithSlippage;
};
