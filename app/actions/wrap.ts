import { addresses } from "@klimadao/lib/constants";
import { ethers, providers } from "ethers";
import { OnStatusHandler } from "./utils";
import { formatUnits, getContractByToken } from "@klimadao/lib/utils";

export const changeApprovalTransaction = async (params: {
  provider: providers.JsonRpcProvider;
  onStatus: OnStatusHandler;
}) => {
  try {
    const contract = getContractByToken({
      token: "sklima",
      provider: params.provider.getSigner(),
    });
    const value = ethers.utils.parseUnits("1000000000", "gwei"); //bignumber
    params.onStatus("userConfirmation", "");
    const txn = await contract.approve(
      addresses["mainnet"].wsklima,
      value.toString()
    );
    params.onStatus("networkConfirmation", "");
    await txn.wait(1);
    params.onStatus("done", "Approval was successful");
    return formatUnits(value);
  } catch (error: any) {
    if (error.code === 4001) {
      params.onStatus("error", "userRejected");
      throw error;
    }
    params.onStatus("error");
    throw error;
  }
};

export const wrapTransaction = async (params: {
  action: "wrap" | "unwrap";
  provider: providers.JsonRpcProvider;
  value: string;
  onStatus: OnStatusHandler;
}) => {
  try {
    const contract = getContractByToken({
      token: "wsklima",
      provider: params.provider.getSigner(),
    });
    params.onStatus("userConfirmation", "");
    const decimal = params.action === "wrap" ? 9 : 18;
    const txn = await contract[params.action](
      ethers.utils.parseUnits(params.value, decimal)
    );
    params.onStatus("networkConfirmation", "");
    await txn.wait(1);
    params.onStatus("done", "Transaction was successful");
  } catch (error: any) {
    if (error.code === 4001) {
      params.onStatus("error", "userRejected");
      throw error;
    }
    params.onStatus("error");
    throw error;
  }
};
