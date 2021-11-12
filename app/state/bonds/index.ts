import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Bond } from "@klimadao/lib/constants";

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
    maxBondPrice?: number;
    bondPrice?: number;
    marketPrice?: number;
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
      const pendingPayout =
        Number(s[a.payload.bond]!.pendingPayout) - Number(a.payload.value);
      const interestDue =
        Number(s[a.payload.bond]!.interestDue) - Number(a.payload.value);
      s[a.payload.bond]!.pendingPayout = pendingPayout.toString();
      s[a.payload.bond]!.interestDue = interestDue.toString();
    },
  },
});

export const { setBond, redeemBond } = bondsSlice.actions;

export default bondsSlice.reducer;
