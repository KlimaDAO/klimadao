import { AppNotificationStatus, TxnStatus } from "state/app";
import { t } from "@lingui/macro";
import { ethers, providers } from "ethers";
import {
  formatUnits,
  getTokenDecimals,
  getContract,
} from "@klimadao/lib/utils";
import {
  AllowancesSpender,
  AllowancesToken,
} from "@klimadao/lib/types/allowances";
import { addresses } from "@klimadao/lib/constants";

export type OnStatusHandler = (status: TxnStatus, message?: string) => void;

export const getStatusMessage = (status: AppNotificationStatus) => {
  const { statusType, message } = status;
  if (statusType === "error" && message) {
    if (message === "userRejected")
      return t({
        id: "status.user_rejected",
        message: "You chose to reject the transaction",
      });
    return message;
  } else if (statusType === "error") {
    return t({
      id: "status.error",
      message: "❌ Error: something went wrong...",
    });
  } else if (statusType === "done") {
    return t({ id: "status.done", message: "Transaction complete." });
  } else if (statusType === "userConfirmation") {
    return t({
      id: "status.user_confirmation",
      message: "Please click 'confirm' in your wallet to continue.",
    });
  } else if (statusType === "networkConfirmation") {
    return t({
      id: "status.network_confirmation",
      message: "Transaction initiated. Waiting for network confirmation.",
    });
  }
  return null;
};

export const changeApprovalTransaction = async (params: {
  value: string;
  provider: providers.JsonRpcProvider;
  token: AllowancesToken;
  spender: AllowancesSpender;
  onStatus: OnStatusHandler;
}): Promise<string> => {
  try {
    const contract = getContract({
      contractName: params.token as AllowancesToken,
      provider: params.provider.getSigner(),
    });
    const decimals = getTokenDecimals(params.token);
    const parsedValue = ethers.utils.parseUnits(params.value, decimals);
    params.onStatus("userConfirmation", "");
    const txn = await contract.approve(
      addresses["mainnet"][params.spender],
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
