import {
  AllowancesSpender,
  AllowancesToken,
} from "@klimadao/lib/types/allowances";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "state";

export const selectBalances = (state: RootState) => state.user.balance;
export const selectAppState = (state: RootState) => state.app;
export const selectUserState = (state: RootState) => state.user;

export const selectAllowances = createSelector(
  selectUserState,
  (user) => user.allowances
);
// select allowances with params
type Allowances = { [key in AllowancesToken]: string };
type Params = { tokens: AllowancesToken[]; spender: AllowancesSpender };
export const selectAllowancesWithParams = createSelector(
  [selectAllowances, (state, params: Params) => params],
  (allowances, params) => {
    const collectedAllowances = params.tokens.reduce<Allowances>(
      (obj, token) => {
        if (allowances?.[token]?.[params.spender]) {
          obj[token] = allowances?.[token][params.spender];
        }
        return obj;
      },
      {} as Allowances
    );
    const isEmpty = Object.keys(collectedAllowances).length === 0;
    return isEmpty ? null : collectedAllowances;
  }
);

export const selectBondAllowance = createSelector(
  selectUserState,
  (user) => user.bondAllowance
);
export const selectPklimaTerms = createSelector(
  selectUserState,
  (user) => user.pklimaTerms
);
export const selectCarbonRetired = createSelector(
  selectUserState,
  (user) => user.carbonRetired
);
export const selectNotificationStatus = createSelector(
  selectAppState,
  (rootState) => rootState.notificationStatus
);
export const selectLocale = createSelector(
  selectAppState,
  (rootState) => rootState.locale
);
export const selectDomain = createSelector(
  selectUserState,
  (user) => user.nameServiceDomains
);
