import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Bond } from "@klimadao/lib/constants";
import { safeSub } from "@klimadao/lib/utils";

type InverseBondState = {
  [bond in Bond]?: {
    bond: Bond;
    balance?: string;
    interestDue?: string;
    bondMaturationBlock?: number;
    pendingPayout?: string;
    bondDiscount?: number;
    debtRatio?: number;
    bondQuote?: string;
    vestingTerm?: number;
    maxBondPrice?: string;
    bondPrice?: string;
    marketPrice?: string;
    fee?: number;
  };
};

const initialState: any = {
  usdc: undefined,
};

/** Helper type to reduce boilerplate */
type InverseBondPayload = Partial<InverseBondState[Bond]> & { bond: Bond };

export const inverseBondsSlice = createSlice({
  name: "inverse-bonds",
  initialState,
  reducers: {
    setInverseBond: (s, a: PayloadAction<InverseBondPayload>) => {
      s[a.payload.bond] = { ...s[a.payload.bond], ...a.payload };
    },
    redeemInverseBond: (s, a: PayloadAction<{ bond: Bond; value: string }>) => {
      s[a.payload.bond]!.pendingPayout = safeSub(
        s[a.payload.bond]!.pendingPayout!,
        a.payload.value
      );
      s[a.payload.bond]!.interestDue = safeSub(
        s[a.payload.bond]!.interestDue!,
        a.payload.value
      );
    },
  },
});

export const { setInverseBond, redeemInverseBond } = inverseBondsSlice.actions;

export default inverseBondsSlice.reducer;
