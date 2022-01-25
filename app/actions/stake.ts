import { ethers, providers } from "ethers";
import { OnStatusHandler } from "./utils";
import { addresses } from "@klimadao/lib/constants";

import IERC20 from "@klimadao/lib/abi/IERC20.json";
import KlimaStakingHelper from "@klimadao/lib/abi/KlimaStakingHelper.json";
import KlimaStakingv2 from "@klimadao/lib/abi/KlimaStakingv2.json";
import { formatUnits } from "@klimadao/lib/utils";

export const changeApprovalTransaction = async (params: {
  provider: providers.JsonRpcProvider;
  onStatus: OnStatusHandler;
  action: "stake" | "unstake";
}): Promise<string> => {
  try {
    const contract = {
      stake: new ethers.Contract(
        addresses["mainnet"].klima,
        IERC20.abi,
        params.provider.getSigner()
      ),
      unstake: new ethers.Contract(
        addresses["mainnet"].sklima,
        IERC20.abi,
        params.provider.getSigner()
      ),
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
      stake: new ethers.Contract(
        addresses["mainnet"].staking_helper,
        KlimaStakingHelper.abi,
        params.provider.getSigner()
      ),
      unstake: new ethers.Contract(
        addresses["mainnet"].staking,
        KlimaStakingv2.abi,
        params.provider.getSigner()
      ),
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
