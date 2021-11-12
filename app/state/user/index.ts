import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { redeemBond } from "state/bonds";
import { safeAdd, safeSub } from "@klimadao/lib/utils";
export interface UserState {
  balance?: {
    klima: string;
    sklima: string;
    aklima: string;
    alklima: string;
    bct: string;
    pklima: string;
  };
  pklimaTerms?: {
    claimed: string;
    max: string;
    redeemable: string;
    supplyShare: number;
  };
  migrateAllowance?: {
    aklima: string;
    alklima: string;
  };
  exerciseAllowance?: {
    pklima: string;
    bct: string;
  };
  stakeAllowance?: {
    klima: string;
    sklima: string;
  };
  bondAllowance?: {
    bct: string;
    klima_bct_lp: string;
    bct_usdc_lp: string;
  };
}

const initialState: UserState = {
  balance: undefined,
  migrateAllowance: undefined,
  exerciseAllowance: undefined,
  stakeAllowance: undefined,
  bondAllowance: undefined,
};

/** Helper type to reduce boilerplate */
type Setter<P extends keyof UserState> = PayloadAction<
  Partial<NonNullable<UserState[P]>>
>;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setBalance: (s, a: Setter<"balance">) => {
      s.balance = { ...s.balance, ...a.payload } as UserState["balance"];
    },
    setPklimaTerms: (s, a: Setter<"pklimaTerms">) => {
      s.pklimaTerms = {
        ...s.pklimaTerms,
        ...a.payload,
      } as UserState["pklimaTerms"];
    },
    setMigrateAllowance: (s, a: Setter<"migrateAllowance">) => {
      s.migrateAllowance = {
        ...s.migrateAllowance,
        ...a.payload,
      } as UserState["migrateAllowance"];
    },
    setExerciseAllowance: (s, a: Setter<"exerciseAllowance">) => {
      s.exerciseAllowance = {
        ...s.exerciseAllowance,
        ...a.payload,
      } as UserState["exerciseAllowance"];
    },
    setStakeAllowance: (s, a: Setter<"stakeAllowance">) => {
      s.stakeAllowance = {
        ...s.stakeAllowance,
        ...a.payload,
      } as UserState["stakeAllowance"];
    },
    setBondAllowance: (s, a: Setter<"bondAllowance">) => {
      s.bondAllowance = {
        ...s.bondAllowance,
        ...a.payload,
      } as UserState["bondAllowance"];
    },
    incrementStake: (s, a: PayloadAction<string>) => {
      if (!s.balance) return s; // type-guard, should never happen
      s.balance.klima = safeSub(s.balance.klima, a.payload);
      s.balance.sklima = safeAdd(s.balance.sklima, a.payload);
    },
    decrementStake: (s, a: PayloadAction<string>) => {
      if (!s.balance) return s; // type-guard, should never happen
      s.balance.klima = safeAdd(s.balance.klima, a.payload);
      s.balance.sklima = safeSub(s.balance.sklima, a.payload);
    },
    redeemAlpha: (
      s,
      a: PayloadAction<{ token: "aklima" | "alklima"; value: string }>
    ) => {
      if (!s.balance) return s; // type-guard, should never happen
      s.balance[a.payload.token] = safeSub(
        s.balance[a.payload.token],
        a.payload.value
      );
      s.balance.klima = safeAdd(s.balance.klima, a.payload.value);
    },
    redeemPklima: (s, a: PayloadAction<string>) => {
      if (!s.balance || !s.pklimaTerms) return s; // type-guard, should never happen
      s.balance.pklima = safeSub(s.balance.pklima, a.payload);
      s.balance.bct = safeSub(s.balance.bct, a.payload);
      s.balance.klima = safeAdd(s.balance.klima, a.payload);
      s.pklimaTerms.redeemable = safeSub(s.pklimaTerms.redeemable, a.payload);
      s.pklimaTerms.claimed = safeAdd(s.pklimaTerms.claimed, a.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(redeemBond, (s, a) => {
      if (!s.balance) return;
      s.balance.klima = safeAdd(s.balance.klima, a.payload.value);
    });
  },
});

export const {
  setBalance,
  setPklimaTerms,
  setMigrateAllowance,
  setExerciseAllowance,
  setStakeAllowance,
  setBondAllowance,
  incrementStake,
  decrementStake,
  redeemAlpha,
  redeemPklima,
} = userSlice.actions;

export default userSlice.reducer;
