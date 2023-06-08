import { PoolToken } from "@klimadao/lib/constants";
import {
  getAllowance,
  getContract,
  getStaticProvider,
  getTokenDecimals,
  safeAdd,
} from "@klimadao/lib/utils";
import { providers, utils } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { getAddress } from "lib/networkAware/getAddress";
import { OnStatusHandler } from "lib/statusMessage";
import { CarbonmarkPaymentMethod } from "lib/types/carbonmark";

export const getRedeemAllowance = async (params: {
  userAddress: string;
  token: CarbonmarkPaymentMethod;
}) => {
  if (params.token === "fiat") return; // typeguard

  const allowance = await getAllowance({
    contract: getContract({
      contractName: params.token,
      provider: getStaticProvider(),
    }),
    address: params.userAddress,
    spender: "retirementAggregatorV2",
    token: params.token,
  });

  return allowance;
};

export const redeemCarbonTransaction = async (params: {
  provider: providers.JsonRpcProvider;
  paymentMethod: CarbonmarkPaymentMethod;
  pool: PoolToken;
  projectTokenAddress: string;
  maxCost: string;
  quantity: string;
  onStatus: OnStatusHandler;
}) => {
  try {
    if (params.paymentMethod === "fiat") {
      throw Error("Unsupported payment method");
    }

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
      getAddress(params.paymentMethod),
      getAddress(params.pool),
      utils.parseUnits(params.maxCost, getTokenDecimals(params.paymentMethod)),
      [params.projectTokenAddress],
      [utils.parseUnits(params.quantity, 18)],
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
  paymentMethod: CarbonmarkPaymentMethod;
  pool: PoolToken;
  quantity: string;
}): Promise<string> => {
  if (params.paymentMethod === "fiat") {
    throw Error("Unsupported payment method");
  }

  const aggregator = getContract({
    contractName: "retirementAggregatorV2",
    provider: getStaticProvider(),
  });
  const amount = await aggregator.getSourceAmountSpecificRedeem(
    getAddress(params.paymentMethod),
    getAddress(params.pool),
    [utils.parseUnits(params.quantity, 18)]
  );
  const decimals = getTokenDecimals(params.paymentMethod);
  const value = formatUnits(amount, decimals);
  const valueWithSlippage = safeAdd(
    value,
    (Number(value) * 0.005).toFixed(decimals)
  );
  return valueWithSlippage;
};
