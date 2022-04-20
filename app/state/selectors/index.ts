import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "state";

export const selectBalances = (state: RootState) => state.user.balance;
export const selectAppState = (state: RootState) => state.app;
export const selectUserState = (state: RootState) => state.user;

export const selectStakeAllowance = createSelector(
  selectUserState,
  (user) => user.stakeAllowance
);
export const selectMigrateAllowance = createSelector(
  selectUserState,
  (user) => user.migrateAllowance
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
  selectUserState,
  (user) => user.wrapAllowance
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
  (rootState) => rootState.locale || "en"
);
