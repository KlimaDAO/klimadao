import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { FALLBACK_BLOCK_RATE } from "@klimadao/lib/constants";

export type TxnStatus =
  | "userConfirmation"
  | "networkConfirmation"
  | "done"
  | "error"
  | "claimExceeded";

export interface AppNotificationStatus {
  statusType: TxnStatus | undefined;
  message: string | undefined;
}

interface AppState {
  currentIndex: string | undefined;
  currentBlock: number | undefined;
  fiveDayRate: number | undefined;
  stakingAPY: number | undefined;
  stakingRebase: number | undefined;
  treasuryBalance: number | undefined;
  rebaseBlock: number | undefined;
  blockRate: number;
  locale: string | undefined;
  notificationStatus: AppNotificationStatus | null;
}

const initialState: AppState = {
  currentIndex: undefined,
  currentBlock: undefined,
  fiveDayRate: undefined,
  stakingAPY: undefined,
  stakingRebase: undefined,
  treasuryBalance: undefined,
  rebaseBlock: undefined,
  blockRate: FALLBACK_BLOCK_RATE,
  locale: undefined,
  notificationStatus: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppState: (s, a: PayloadAction<Partial<AppState>>) => {
      return { ...s, ...a.payload };
    },
  },
});

export const { setAppState } = appSlice.actions;

export default appSlice.reducer;
