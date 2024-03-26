/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Bond,
  OffsetInputToken,
  RetirementToken,
} from "@klimadao/lib/constants";
import {
  AllowancesFormatted,
  AllowancesSpender,
  AllowancesToken,
} from "@klimadao/lib/types/allowances";
import {
  ProjectTokenBalance,
  RetirementsTotalsAndBalances,
} from "@klimadao/lib/types/offset";
import { safeAdd, safeSub, trimStringDecimals } from "@klimadao/lib/utils";
import {
  ActionReducerMapBuilder,
  PayloadAction,
  createSlice,
} from "@reduxjs/toolkit";
import { RedeemPaymentMethod } from "lib/hooks/useRedeemParams";
import { redeemBond } from "state/bonds";

export interface UserState {
  balance?: {
    klima: string;
    sklima: string;
    wsklima: string;
    wsklimaUnwrapped: string;
    pklima: string;
    bct: string;
    mco2: string;
    nct: string;
    ubo: string;
    nbo: string;
    usdc: string; // USDC.e
  };
  projectTokens: {
    [address: string]: ProjectTokenBalance;
  };
  nameServiceDomains?: {
    knsDomain: Domain;
    ensDomain: Domain;
  };
  pklimaTerms?: {
    claimed: string;
    max: string;
    redeemable: string;
    supplyShare: number;
  };
  bondAllowance?: {
    [key in Bond]: string;
  };
  carbonRetired?: RetirementsTotalsAndBalances;
  allowances?: AllowancesFormatted;
}
export interface Domain {
  name: string;
  imageUrl: string;
}

const initialState: UserState = {
  balance: undefined,
  projectTokens: {},
  nameServiceDomains: undefined,
  pklimaTerms: undefined,
  bondAllowance: undefined,
  carbonRetired: undefined,
  allowances: undefined,
};

/** Helper type to reduce boilerplate */
type Setter<P extends keyof UserState> = PayloadAction<
  Partial<NonNullable<UserState[P]>>
>;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setBalance: (s, a) => {
      s.balance = { ...s.balance!, ...a.payload };
    },
    setProjectToken: (
      s,
      a: PayloadAction<Partial<ProjectTokenBalance> & { address: string }>
    ) => {
      s.projectTokens[a.payload.address] = {
        ...s.projectTokens[a.payload.address],
        ...a.payload,
      };
    },
    updateRedemption: (
      s,
      a: PayloadAction<{
        paymentMethod: RedeemPaymentMethod;
        projectTokenAddress: string;
        quantity: string;
        cost: string;
        tempSymbol?: string;
      }>
    ) => {
      s.allowances![a.payload.paymentMethod]["retirementAggregatorV2"] = "0.0";
      // when it's a freshly purchased tco2 we don't know the symbol so we pass an override down
      const symbol =
        s.projectTokens[a.payload.projectTokenAddress]?.symbol ??
        a.payload.tempSymbol ??
        "";

      s.projectTokens[a.payload.projectTokenAddress] = {
        ...s.projectTokens[a.payload.projectTokenAddress],
        symbol,
        quantity: safeAdd(
          s.projectTokens[a.payload.projectTokenAddress]?.quantity || "0",
          a.payload.quantity
        ),
      };
    },
    decrementProjectToken: (
      s,
      a: PayloadAction<{ address: string; quantityRetired: string }>
    ) => {
      s.projectTokens[a.payload.address] = {
        ...s.projectTokens[a.payload.address],
        allowance: "0.0",
        quantity: safeSub(
          s.projectTokens[a.payload.address].quantity,
          a.payload.quantityRetired
        ),
      };
    },
    setDomains: (s, a: Setter<"nameServiceDomains">) => {
      s.nameServiceDomains = {
        ...s.nameServiceDomains!,
        ...a.payload,
      };
    },
    setPklimaTerms: (s, a: Setter<"pklimaTerms">) => {
      s.pklimaTerms = {
        ...s.pklimaTerms!,
        ...a.payload,
      };
    },
    setBondAllowance: (s, a: Setter<"bondAllowance">) => {
      s.bondAllowance = {
        ...s.bondAllowance!,
        ...a.payload,
      };
    },
    setCarbonRetiredBalances: (s, a: Setter<"carbonRetired">) => {
      s.carbonRetired = {
        ...s.carbonRetired!,
        ...a.payload,
      };
    },
    updateAllowances: (s, a: PayloadAction<AllowancesFormatted>) => {
      const allowancesState = { ...s.allowances };
      const allTokens = Object.keys(a.payload);
      const mergedAllowances = allTokens.reduce((obj, token) => {
        obj[token as keyof typeof allowancesState] = {
          ...allowancesState[token as keyof typeof allowancesState],
          ...a.payload[token as keyof typeof allowancesState],
        };
        return obj;
      }, {} as AllowancesFormatted);
      s.allowances = {
        ...s.allowances,
        ...mergedAllowances,
      };
    },
    setAllowance: (
      s,
      a: PayloadAction<{
        token: AllowancesToken;
        spender: AllowancesSpender;
        value: string;
      }>
    ) => {
      if (!s.allowances) return s; // type-guard, should never happen
      s.allowances[a.payload.token][a.payload.spender] = a.payload.value;
    },
    decrementAllowance: (
      s,
      a: PayloadAction<{
        token: AllowancesToken;
        spender: AllowancesSpender;
        value: string;
      }>
    ) => {
      if (!s.allowances) return s; // type-guard, should never happen
      s.allowances[a.payload.token][a.payload.spender] = safeSub(
        s.allowances[a.payload.token][a.payload.spender],
        a.payload.value
      );
    },
    updateRetirement: (
      s,
      a: PayloadAction<{
        inputToken: OffsetInputToken;
        retirementToken: RetirementToken;
        cost: string;
        quantity: string;
      }>
    ) => {
      if (!s.balance || !s.carbonRetired) return s;
      s.balance[a.payload.inputToken] = safeSub(
        s.balance[a.payload.inputToken],
        a.payload.cost
      );
      s.carbonRetired[a.payload.retirementToken] = safeAdd(
        s.carbonRetired[a.payload.retirementToken],
        a.payload.quantity
      );
      s.carbonRetired.totalRetirements = safeAdd(
        s.carbonRetired.totalRetirements,
        "1"
      );
      s.carbonRetired.totalTonnesRetired = safeAdd(
        s.carbonRetired.totalTonnesRetired,
        a.payload.quantity
      );
    },
    incrementStake: (s, a: PayloadAction<string>) => {
      if (!s.balance) return s; // type-guard, should never happen
      s.balance.klima = safeSub(s.balance.klima, a.payload);
      s.balance.sklima = safeAdd(s.balance.sklima, a.payload);
    },
    decrementStake: (s, a: PayloadAction<string>) => {
      if (!s.balance) return s;
      s.balance.klima = safeAdd(s.balance.klima, a.payload);
      s.balance.sklima = safeSub(s.balance.sklima, a.payload);
    },
    incrementWrap: (
      s,
      a: PayloadAction<{ sklima: string; currentIndex: string }>
    ) => {
      if (!s.balance) return s;
      const indexAdjusted = trimStringDecimals(
        (Number(a.payload.sklima) / Number(a.payload.currentIndex)).toString(),
        9
      );
      s.balance.sklima = safeSub(s.balance.sklima, a.payload.sklima);
      s.balance.wsklima = safeAdd(s.balance.wsklima, indexAdjusted);
    },
    decrementWrap: (
      s,
      a: PayloadAction<{ wsklima: string; currentIndex: string }>
    ) => {
      if (!s.balance) return s;
      const indexAdjusted = trimStringDecimals(
        (Number(a.payload.wsklima) * Number(a.payload.currentIndex)).toString(),
        9
      );
      s.balance.sklima = safeAdd(s.balance.sklima, indexAdjusted);
      s.balance.wsklima = safeSub(s.balance.wsklima, a.payload.wsklima);
    },
    redeemPklima: (s, a: PayloadAction<string>) => {
      if (!s.balance || !s.pklimaTerms) return s;
      s.balance.pklima = safeSub(s.balance.pklima, a.payload);
      s.balance.bct = safeSub(s.balance.bct, a.payload);
      s.balance.klima = safeAdd(s.balance.klima, a.payload);
      s.pklimaTerms.redeemable = safeSub(s.pklimaTerms.redeemable, a.payload);
      s.pklimaTerms.claimed = safeAdd(s.pklimaTerms.claimed, a.payload);
    },
  },
  // coax the types to fix a ts inference bug https://github.com/reduxjs/redux-toolkit/issues/2862
  extraReducers: (builder: ActionReducerMapBuilder<UserState>) => {
    builder.addCase(redeemBond, (s, a) => {
      if (s?.balance && a.payload.autostake) {
        s.balance.sklima = safeAdd(s.balance.sklima, a.payload.value);
      } else if (s?.balance) {
        s.balance.klima = safeAdd(s.balance.klima, a.payload.value);
      }
    });
  },
});

export const {
  setBalance,
  setProjectToken,
  updateRedemption,
  decrementProjectToken,
  setPklimaTerms,
  setBondAllowance,
  setCarbonRetiredBalances,
  updateAllowances,
  setAllowance,
  decrementAllowance,
  updateRetirement,
  incrementStake,
  decrementStake,
  incrementWrap,
  decrementWrap,
  redeemPklima,
  setDomains,
} = userSlice.actions;

export default userSlice.reducer;
