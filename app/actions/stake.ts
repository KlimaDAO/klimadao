import { utils, providers } from "ethers";
import { OnStatusHandler } from "./utils";
import { formatUnits, getContract } from "@klimadao/lib/utils";

export const changeStakeTransaction = async (params: {
  value: string;
  provider: providers.JsonRpcProvider;
  onStatus: OnStatusHandler;
  action: "stake" | "unstake";
}) => {
  try {
    const parsedValue = utils.parseUnits(params.value, "gwei");
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
        ? await contract.stake(parsedValue)
        : await contract.unstake(parsedValue, true); // always trigger rebase because gas is cheap
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
