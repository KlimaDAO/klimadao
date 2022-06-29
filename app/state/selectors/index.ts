import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "state";
import {
  AllowancesSpender,
  AllowancesToken,
} from "@klimadao/lib/types/allowances";

export const selectBalances = (state: RootState) => state.user.balance;
export const selectAppState = (state: RootState) => state.app;
export const selectUserState = (state: RootState) => state.user;

export const selectAllowances = createSelector(
  selectUserState,
  (user) => user.allowances
);
export const selectStakeAllowance = createSelector(
  selectAllowances,
  (allowances) => allowances?.klima?.staking_helper
);
export const selectUnstakeAllowance = createSelector(
  selectAllowances,
  (allowances) => allowances?.sklima?.staking
);

export const selectExerciseAllowanceBCT = createSelector(
  selectAllowances,
  (allowances) => allowances?.bct?.pklima_exercise
);
export const selectExerciseAllowancePklima = createSelector(
  selectAllowances,
  (allowances) => allowances?.pklima?.pklima_exercise
// select allowances with params
type Allowances = { [key in AllowancesToken]: string };
type Params = { tokens: AllowancesToken[]; spender: AllowancesSpender };
export const selectAllowancesWithParams = createSelector(
  [selectAllowances, (state, params: Params) => params],
  (allowances, params) => {
    const collectedAllowances = params.tokens.reduce<Allowances>(
      (obj, token) => {
        if (allowances?.[token][params.spender]) {
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

export const selectExerciseAllowance = createSelector(
  selectUserState,
  (user) => user.exerciseAllowance
);
export const selectBondAllowance = createSelector(
  selectUserState,
  (user) => user.bondAllowance
);
export const selectWrapAllowance = createSelector(
  selectAllowances,
  (allowances) => allowances?.sklima?.wsklima
);
export const selectPklimaTerms = createSelector(
  selectUserState,
  (user) => user.pklimaTerms
);
export const selectCarbonRetired = createSelector(
  selectUserState,
  (user) => user.carbonRetired
);
export const selectCarbonRetiredAllowance = createSelector(
  selectUserState,
  (user) => user.carbonRetiredAllowance
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
