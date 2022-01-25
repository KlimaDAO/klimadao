import { AppNotificationStatus, TxnStatus } from "state/app";

export type OnStatusHandler = (status: TxnStatus, message?: string) => void;

export const getStatusMessage = (status: AppNotificationStatus) => {
  const { statusType, message } = status;
  if (statusType === "error" && message) {
    if (message === "userRejected")
      return "You chose to reject the transaction";
    return message;
  } else if (statusType === "error") {
    return "❌ Error: something went wrong...";
  } else if (statusType === "done") {
    return "Transaction complete.";
  } else if (statusType === "userConfirmation") {
    return "Please click 'confirm' in your wallet to continue.";
  } else if (statusType === "networkConfirmation") {
    return "Transaction initiated. Waiting for network confirmation.";
  }
  return null;
};
