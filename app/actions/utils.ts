import { AppNotificationStatus, TxnStatus } from "state/app";
import { t } from "@lingui/macro";

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
