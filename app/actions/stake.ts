import { ethers, providers } from "ethers";
import { OnStatusHandler } from "./utils";
import { addresses } from "@klimadao/lib/constants";

import { formatUnits, getContract } from "@klimadao/lib/utils";

export const changeApprovalTransaction = async (params: {
  provider: providers.JsonRpcProvider;
  onStatus: OnStatusHandler;
  action: "stake" | "unstake";
}): Promise<string> => {
  try {
    const contract = {
      stake: getContract({
        token: "klima",
        provider: params.provider.getSigner(),
      }),
      unstake: getContract({
        token: "sklima",
        provider: params.provider.getSigner(),
      }),
    }[params.action];
    const address = {
      stake: addresses["mainnet"].staking_helper,
      unstake: addresses["mainnet"].staking,
    }[params.action];
    const value = ethers.utils.parseUnits("1000000000", "gwei"); //bignumber
    params.onStatus("userConfirmation", "");
    const txn = await contract.approve(address, value.toString());
    params.onStatus("networkConfirmation", "");
    await txn.wait(1);
    params.onStatus("done", "Transaction approved successfully");
    return formatUnits(value, 9);
  } catch (error: any) {
    if (error.code === 4001) {
      params.onStatus("error", "userRejected");
      throw error;
    }
    params.onStatus("error");
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
    const contract = {
      stake: getContract({
        token: "staking_helper",
        provider: params.provider.getSigner(),
      }),
      unstake: getContract({
        token: "staking",
        provider: params.provider.getSigner(),
      }),
    }[params.action];
    params.onStatus("userConfirmation", "");
    const txn =
      params.action === "stake"
        ? await contract.stake(parsedValue)
        : await contract.unstake(parsedValue, true); // always trigger rebase because gas is cheap
    params.onStatus("networkConfirmation", "");
    await txn.wait(1);
    params.onStatus("done", "Transaction confirmed");
  } catch (error: any) {
    if (error.code === 4001) {
      params.onStatus("error", "userRejected");
      throw error;
    }
    params.onStatus("error");
    throw error;
  }
};
