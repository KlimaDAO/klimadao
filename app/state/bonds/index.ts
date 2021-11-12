import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Bond } from "@klimadao/lib/constants";
import { safeSub } from "@klimadao/lib/utils";

type BondState = {
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
  };
};

const initialState: BondState = {
  bct: undefined,
  klima_bct_lp: undefined,
  bct_usdc_lp: undefined,
};

/** Helper type to reduce boilerplate */
type BondPayload = Partial<BondState[Bond]> & { bond: Bond };

export const bondsSlice = createSlice({
  name: "bonds",
  initialState,
  reducers: {
    setBond: (s, a: PayloadAction<BondPayload>) => {
      s[a.payload.bond] = { ...s[a.payload.bond], ...a.payload };
    },
    redeemBond: (s, a: PayloadAction<{ bond: Bond; value: string }>) => {
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

export const { setBond, redeemBond } = bondsSlice.actions;

export default bondsSlice.reducer;
