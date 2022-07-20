import { ethers, providers } from "ethers";
import { OnStatusHandler } from "./utils";
import { addresses } from "@klimadao/lib/constants";
import { getTransactionOptions } from "@klimadao/lib/utils";

import { formatUnits, getContract } from "@klimadao/lib/utils";

export const changeApprovalTransaction = async (params: {
  value: string;
  provider: providers.JsonRpcProvider;
  onStatus: OnStatusHandler;
  action: "stake" | "unstake";
}): Promise<string> => {
  try {
    const parsedValue = ethers.utils.parseUnits(params.value, 9);
    const contract = {
      stake: getContract({
        contractName: "klima",
        provider: params.provider.getSigner(),
      }),
      unstake: getContract({
        contractName: "sklima",
        provider: params.provider.getSigner(),
      }),
    }[params.action];
    const address = {
      stake: addresses["mainnet"].staking_helper,
      unstake: addresses["mainnet"].staking,
    }[params.action];
    params.onStatus("userConfirmation", "");
    const txn = await contract.approve(
      address,
      parsedValue.toString(),
      await getTransactionOptions()
    );
    params.onStatus("networkConfirmation", "");
    await txn.wait(1);
    params.onStatus("done", "Transaction approved successfully");
    return formatUnits(parsedValue, 9);
  } catch (error: any) {
    if (error.code === 4001) {
      params.onStatus("error", "userRejected");
      throw error;
    }
    params.onStatus("error");
    console.error("Error in changeApprovalTransaction", error);
    throw error;
  }
};

export const changeStakeTransaction = async (params: {
  value: string;
  provider: providers.JsonRpcProvider;
  onStatus: OnStatusHandler;
  action: "stake" | "unstake";
}) => {
  try {
    const parsedValue = ethers.utils.parseUnits(params.value, "gwei");
    const transactionOptions = await getTransactionOptions();
    const contract = {
      stake: getContract({
        contractName: "staking_helper",
        provider: params.provider.getSigner(),
      }),
      unstake: getContract({
        contractName: "staking",
        provider: params.provider.getSigner(),
      }),
    }[params.action];
    params.onStatus("userConfirmation", "");
    const txn =
      params.action === "stake"
        ? await contract.stake(parsedValue, transactionOptions)
        : await contract.unstake(parsedValue, true, transactionOptions); // always trigger rebase because gas is cheap
    params.onStatus("networkConfirmation", "");
    await txn.wait(1);
    params.onStatus("done", "Transaction confirmed");
    return formatUnits(parsedValue, 9);
  } catch (error: any) {
    if (error.code === 4001) {
      params.onStatus("error", "userRejected");
      throw error;
    }
    params.onStatus("error");
    throw error;
  }
};
