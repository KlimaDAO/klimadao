// import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "state";

export const selectPklima = (state: RootState) => state.user.balance?.pklima;
