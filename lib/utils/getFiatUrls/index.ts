import { FIAT } from "../../constants";

export const getFiatRetirementUrl = (params: { isProduction: boolean }) =>
  params.isProduction
    ? FIAT.retirementCheckout.production
    : FIAT.retirementCheckout.staging;

export const getFiatBalanceUrl = (params: { isProduction: boolean }) =>
  params.isProduction
    ? FIAT.retirementBalance.production
    : FIAT.retirementBalance.staging;
