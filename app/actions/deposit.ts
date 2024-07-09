import IERC20 from "@klimadao/lib/abi/IERC20.json";
import ToucanPoolToken from "@klimadao/lib/abi/ToucanPoolToken.json";
import { addresses } from "@klimadao/lib/constants";
import { Contract, providers } from "ethers";
import { formatUnits, parseUnits } from "ethers-v6";
import { CarbonToken } from "lib/queryUserCarbonTokens";
import { OnStatusHandler } from "./utils";

export const approveDepositToken = async (params: {
  provider: providers.JsonRpcProvider;
  selectedToken: Pick<CarbonToken, "amount" | "token">;
  quantity: string;
  onStatus: OnStatusHandler;
}): Promise<string> => {
  try {
    const contract = new Contract(
      params.selectedToken.token.id,
      IERC20.abi,
      params.provider.getSigner()
    );
    const decimals = params.selectedToken?.token.decimals;
    const parsedValue = parseUnits(params.quantity, decimals);
    params.onStatus("userConfirmation", "");
    const txn = await contract.approve(
      addresses["mainnet"]["bct"],
      parsedValue.toString()
    );
    params.onStatus("networkConfirmation", "");
    await txn.wait(1);
    params.onStatus("done", "Approval was successful");
    return formatUnits(parsedValue, decimals);
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

export const depositTokens = async (params: {
  provider: providers.JsonRpcProvider;
  selectedToken: Pick<CarbonToken, "amount" | "token">;
  quantity: string;
  onStatus: OnStatusHandler;
}): Promise<string> => {
  try {
    const contract = new Contract(
      addresses["mainnet"]["bct"],
      ToucanPoolToken.abi,
      params.provider.getSigner()
    );
    const decimals = params.selectedToken?.token.decimals;
    const parsedValue = parseUnits(params.quantity, decimals);
    params.onStatus("userConfirmation", "");
    const txn = await contract.deposit(
      params.selectedToken?.token.id,
      parsedValue.toString()
    );
    params.onStatus("networkConfirmation", "");
    await txn.wait(1);
    params.onStatus("done", "Deposit was successful");
    return formatUnits(parsedValue, decimals);
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
