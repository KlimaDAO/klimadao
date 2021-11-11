export type TxnStatus =
  | "userConfirmation"
  | "networkConfirmation"
  | "done"
  | "userRejected"
  | "error";

export type OnStatusHandler = (status: TxnStatus) => void;
