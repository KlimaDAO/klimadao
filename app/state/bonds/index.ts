import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Bond = "bct" | "klima_bct_lp" | "bct_usdc_lp";

type BondState = {
  [bond in Bond]?: {
    bond: Bond;
    allowance: string;
    balance: string;
    interestDue: string;
    bondMaturationBlock: number;
    pendingPayout: string;
    bondDiscount: number;
    debtRatio: string;
    bondQuote: string;
    vestingTerm: number;
    maxBondPrice: string;
    bondPrice: number;
    marketPrice: number;
  };
};

const initialState: BondState = {
  bct: undefined,
  klima_bct_lp: undefined,
  bct_usdc_lp: undefined,
};

/** Helper type to reduce boilerplate */
type Setter<P extends Bond> = PayloadAction<NonNullable<BondState[P]>>;

export const bondsSlice = createSlice({
  name: "bonds",
  initialState,
  reducers: {
    setBct: (s, a: Setter<"bct">) => {
      s.bct = { ...s.bct, ...a.payload };
    },
    setKlimaBctLp: (s, a: Setter<"klima_bct_lp">) => {
      s.klima_bct_lp = { ...s.klima_bct_lp, ...a.payload };
    },
    setBctUsdcLp: (s, a: Setter<"bct_usdc_lp">) => {
      s.bct_usdc_lp = { ...s.bct_usdc_lp, ...a.payload };
    },
  },
});

export const { setBct, setKlimaBctLp, setBctUsdcLp } = bondsSlice.actions;

export default bondsSlice.reducer;
