// All actions related to Retirement Aggregator
import IERC20 from "@klimadao/lib/abi/IERC20.json";
import { addresses, PoolToken, RetirementToken } from "@klimadao/lib/constants";
import { RetirementReceipt } from "@klimadao/lib/types/offset";
import { formatUnits, getTokenDecimals } from "@klimadao/lib/utils";
import { Contract, providers, utils } from "ethers";
import { getAddress } from "lib/networkAware/getAddress";
import { getAllowance } from "lib/networkAware/getAllowance";
import { getContract } from "lib/networkAware/getContract";
import { getStaticProvider } from "lib/networkAware/getStaticProvider";
import { OnStatusHandler } from "lib/statusMessage";
import { CarbonmarkPaymentMethod } from "lib/types/carbonmark";

export const getRetirementAllowance = async (params: {
  userAddress: string;
  token: CarbonmarkPaymentMethod;
}) => {
  if (params.token === "fiat") return; // typeguard

  const allowance = await getAllowance({
    contract: getContract({
      contractName: "usdc",
      provider: getStaticProvider(),
    }),
    address: params.userAddress,
    spender: "retirementAggregatorV2",
    token: params.token,
  });

  return allowance;
};

export const getConsumptionCost = async (params: {
  inputToken: CarbonmarkPaymentMethod;
  retirementToken: PoolToken;
  quantity: string;
  getSpecific: boolean;
}): Promise<string> => {
  if (params.inputToken === "fiat") return "0"; // typeguard

  console.log("CC params", params);
  const retirementAggregatorContract = getContract({
    contractName: "retirementAggregatorV2",
    provider: getStaticProvider(),
  });
  const parsed = utils.parseUnits(
    params.quantity,
    getTokenDecimals(params.retirementToken)
  );

  let sourceAmount: any;
  if (params.getSpecific) {
    sourceAmount =
      await retirementAggregatorContract.getSourceAmountSpecificRetirement(
        addresses["mainnet"][params.inputToken],
        addresses["mainnet"][params.retirementToken],
        parsed
      );
  } else {
    sourceAmount =
      await retirementAggregatorContract.getSourceAmountDefaultRetirement(
        addresses["mainnet"][params.inputToken],
        addresses["mainnet"][params.retirementToken],
        parsed
      );
  }

  return formatUnits(sourceAmount, getTokenDecimals(params.inputToken));
};

export const approveRetireProjectToken = async (params: {
  value: string;
  signer: providers.JsonRpcSigner;
  tokenAddress: string;
  onStatus: OnStatusHandler;
}): Promise<string> => {
  try {
    const contract = new Contract(
      params.tokenAddress,
      IERC20.abi,
      params.signer
    );
    const parsedValue = utils.parseUnits(params.value, 18);
    params.onStatus("userConfirmation", "");
    const txn = await contract.approve(
      getAddress("retirementAggregatorV2"),
      parsedValue.toString()
    );
    params.onStatus("networkConfirmation", "");
    await txn.wait(1);
    params.onStatus("done", "Approval was successful");
    return formatUnits(parsedValue, 18);
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

export const retireCarbonTransaction = async (params: {
  address: string;
  provider: providers.JsonRpcProvider;
  paymentMethod: CarbonmarkPaymentMethod;
  maxAmountIn: string;
  retirementToken: RetirementToken;
  quantity: string;
  beneficiaryAddress: string;
  beneficiaryName: string;
  retirementMessage: string;
  onStatus: OnStatusHandler;
  projectAddress: string;
}): Promise<RetirementReceipt> => {
  if (params.paymentMethod === "fiat") {
    throw Error("Unsupported payment method");
  }

  enum TransferMode {
    EXTERNAL = 0,
    INTERNAL = 1,
    EXTERNAL_INTERNAL = 2,
    INTERNAL_TOLERANT = 3,
  }

  try {
    // retire transaction
    const retireContract = getContract({
      contractName: "retirementAggregatorV2",
      provider: params.provider.getSigner(),
    });

    params.onStatus("userConfirmation");

    const parsedMaxAmountIn = utils.parseUnits(
      params.maxAmountIn,
      getTokenDecimals(params.paymentMethod)
    );

    let txn;
    if (!!params.projectAddress) {
      txn = await retireContract.retireExactCarbonSpecific(
        addresses["mainnet"][params.paymentMethod],
        addresses["mainnet"][params.retirementToken],
        params.projectAddress,
        parsedMaxAmountIn,
        utils.parseUnits(
          params.quantity,
          getTokenDecimals(params.retirementToken)
        ),
        "",
        params.beneficiaryAddress || params.address,
        params.beneficiaryName,
        params.retirementMessage,
        TransferMode.EXTERNAL
      );
    } else {
      txn = await retireContract.retireExactCarbonDefault(
        addresses["mainnet"][params.paymentMethod],
        addresses["mainnet"][params.retirementToken],
        parsedMaxAmountIn,
        utils.parseUnits(
          params.quantity,
          getTokenDecimals(params.retirementToken)
        ),
        "",
        params.beneficiaryAddress || params.address,
        params.beneficiaryName,
        params.retirementMessage,
        TransferMode.EXTERNAL
      );
    }
    params.onStatus("networkConfirmation");
    const receipt: RetirementReceipt = await txn.wait(1);
    return receipt;
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
