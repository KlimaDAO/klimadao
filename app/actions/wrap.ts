import { getContract, getTokenDecimals } from "@klimadao/lib/utils";
import { providers } from "ethers";
import { parseUnits } from "ethers-v6";
import { OnStatusHandler } from "./utils";

export const wrapTransaction = async (params: {
  action: "wrap" | "unwrap";
  token: "sklima" | "wsklima";
  provider: providers.JsonRpcProvider;
  value: string;
  onStatus: OnStatusHandler;
}) => {
  try {
    const contract = getContract({
      contractName: "wsklima",
      provider: params.provider.getSigner(),
    });
    params.onStatus("userConfirmation", "");
    const decimal = getTokenDecimals(params.token);
    const txn = await contract[params.action](
      parseUnits(params.value, decimal)
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
