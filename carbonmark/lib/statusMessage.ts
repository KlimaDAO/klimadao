import { t } from "@lingui/macro";

export type TxnStatus =
  | "userConfirmation"
  | "networkConfirmation"
  | "done"
  | "error";

export interface TransactionStatusMessage {
  statusType: TxnStatus;
  message?: string;
}

export type OnStatusHandler = (status: TxnStatus, message?: string) => void;

export const getStatusMessage = (status: TransactionStatusMessage) => {
  const { statusType, message } = status;
  if (statusType === "error" && message) {
    if (message === "userRejected")
      return t`You chose to reject the transaction`;
    return message;
  } else if (statusType === "error") {
    return t`❌ Error: something went wrong...`;
  } else if (statusType === "done") {
    return t`Transaction complete.`;
  } else if (statusType === "userConfirmation") {
    return t`Please click 'confirm' in your wallet to continue.`;
  } else if (statusType === "networkConfirmation") {
    return t`Transaction initiated. Waiting for network confirmation.`;
  }
  return null;
};
