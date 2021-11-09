import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  marketPrice: number | undefined;
  circulatingSupply: number | undefined;
  totalSupply: number | undefined;
  currentIndex: number | undefined;
  currentBlock: number | undefined;
  fiveDayRate: number | undefined;
  stakingAPY: number | undefined;
  stakingRebase: number | undefined;
  treasuryBalance: number | undefined;
  rebaseBlock: number | undefined;
}

const initialState: AppState = {
  marketPrice: undefined,
  circulatingSupply: undefined,
  totalSupply: undefined,
  currentIndex: undefined,
  currentBlock: undefined,
  fiveDayRate: undefined,
  stakingAPY: undefined,
  stakingRebase: undefined,
  treasuryBalance: undefined,
  rebaseBlock: undefined,
};

export const appSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAppState: (s, a: PayloadAction<AppState>) => {
      s = { ...s, ...a.payload };
    },
  },
});

export const { setAppState } = appSlice.actions;

export default appSlice.reducer;
