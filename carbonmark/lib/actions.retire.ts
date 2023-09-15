// All actions related to Retirement Aggregator
import IERC20 from "@klimadao/lib/abi/IERC20.json";
import { PoolToken } from "@klimadao/lib/constants";
import { RetirementReceipt } from "@klimadao/lib/types/offset";
import { formatUnits, getTokenDecimals } from "@klimadao/lib/utils";
import { BigNumber, Contract, providers } from "ethers";
import { parseUnits } from "ethers-v6";
import { urls } from "lib/constants";
import { getFiatRetirementCost } from "lib/fiat/fiatCosts";
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
      contractName: params.token,
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
  isDefaultProject: boolean;
  projectTokenAddress: string;
  currentUrl: string;
}): Promise<string> => {
  if (params.inputToken === "fiat") {
    const fiatCosts = await getFiatRetirementCost({
      cancelUrl: `${urls.baseUrl}${params.currentUrl}`,
      referrer: "carbonmark",
      retirement: {
        quantity: params.quantity,
        retirement_token: params.retirementToken,
        beneficiary_address: null,
        beneficiary_name: "placeholder",
        retirement_message: "placeholder",
        // pass token address if not default project
        project_address: !params.isDefaultProject
          ? params.projectTokenAddress
          : null,
      },
    });
    return fiatCosts;
  }

  const retirementAggregatorContract = getContract({
    contractName: "retirementAggregatorV2",
    provider: getStaticProvider(),
  });
  const parsed = parseUnits(
    params.quantity,
    getTokenDecimals(params.retirementToken)
  );

  let sourceAmount: any;
  if (params.isDefaultProject) {
    sourceAmount =
      await retirementAggregatorContract.getSourceAmountDefaultRetirement(
        getAddress(params.inputToken),
        getAddress(params.retirementToken),
        parsed
      );
  } else {
    sourceAmount =
      await retirementAggregatorContract.getSourceAmountSpecificRetirement(
        getAddress(params.inputToken),
        getAddress(params.retirementToken),
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
    const parsedValue = parseUnits(params.value, 18);
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
  retirementToken: PoolToken;
  quantity: string;
  beneficiaryAddress: string;
  beneficiaryName: string;
  retirementMessage: string;
  onStatus: OnStatusHandler;
  projectAddress: string;
  isPoolDefault: boolean;
}): Promise<{
  transactionHash: string;
  /** retirement transaction block number */
  blockNumber: number;
  retirementIndex: number;
}> => {
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

    const parsedMaxAmountIn = parseUnits(
      params.maxAmountIn,
      getTokenDecimals(params.paymentMethod)
    );

    const retirements: BigNumber = await retireContract.getTotalRetirements(
      params.beneficiaryAddress || params.address
    );

    const retirementIndex = (retirements.toNumber() || 0) + 1;

    let txn;
    if (params.isPoolDefault) {
      txn = await retireContract.retireExactCarbonDefault(
        getAddress(params.paymentMethod),
        getAddress(params.retirementToken),
        parsedMaxAmountIn,
        parseUnits(params.quantity, getTokenDecimals(params.retirementToken)),
        "",
        params.beneficiaryAddress || params.address,
        params.beneficiaryName,
        params.retirementMessage,
        TransferMode.EXTERNAL
      );
    } else {
      txn = await retireContract.retireExactCarbonSpecific(
        getAddress(params.paymentMethod),
        getAddress(params.retirementToken),
        params.projectAddress,
        parsedMaxAmountIn,
        parseUnits(params.quantity, getTokenDecimals(params.retirementToken)),
        "",
        params.beneficiaryAddress || params.address,
        params.beneficiaryName,
        params.retirementMessage,
        TransferMode.EXTERNAL
      );
    }
    params.onStatus("networkConfirmation");
    const receipt: RetirementReceipt = await txn.wait(1);

    return {
      transactionHash: receipt.transactionHash,
      /** retirement transaction block number */
      blockNumber: receipt.blockNumber,
      retirementIndex,
    };
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
