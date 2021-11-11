import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  // keep it raw, bignumber, so we can do math safely
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
      const klima = Number(s.balance.klima) - Number(a.payload);
      const sklima = Number(s.balance.sklima) + Number(a.payload);
      s.balance.klima = klima.toString();
      s.balance.sklima = sklima.toString();
    },
    decrementStake: (s, a: PayloadAction<string>) => {
      if (!s.balance) return s; // type-guard, should never happen
      const klima = Number(s.balance.klima) + Number(a.payload);
      const sklima = Number(s.balance.sklima) - Number(a.payload);
      s.balance.klima = klima.toString();
      s.balance.sklima = sklima.toString();
    },
    redeem: (
      s,
      a: PayloadAction<{ token: "aklima" | "alklima"; value: string }>
    ) => {
      if (!s.balance) return s; // type-guard, should never happen
      const newBalance =
        Number(s.balance[a.payload.token]) - Number(a.payload.value);
      const klima = Number(s.balance.klima) + Number(a.payload.value);
      s.balance[a.payload.token] = newBalance.toString();
      s.balance.klima = klima.toString();
    },
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
  redeem,
} = userSlice.actions;

export default userSlice.reducer;
