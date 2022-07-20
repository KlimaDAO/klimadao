import { AppNotificationStatus, TxnStatus } from "state/app";
import { t } from "@lingui/macro";
import { Domain } from "state/user";
import { ethers } from "ethers";
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

export const getENS = async (params: {
  address: string;
}): Promise<Domain | null> => {
  try {
    const ethProvider = ethers.getDefaultProvider(1);
    // const ensDomain = await ethProvider.lookupAddress(params.address);
    const ensDomain = await ethProvider.lookupAddress(
      "0x5A384227B65FA093DEC03Ec34e111Db80A040615".toLowerCase()
    );

    const imageUrl = ensDomain ? await ethProvider.getAvatar(ensDomain) : null;

    if (ensDomain) {
      return {
        name: ensDomain,
        imageUrl: imageUrl || "",
      };
    }

    return null;
  } catch (error) {
    console.log("getENS error", error);
    return Promise.reject(error);
  }
};
