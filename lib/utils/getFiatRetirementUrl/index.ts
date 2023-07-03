import { FIAT } from "../../constants";

export const getFiatRetirementUrl = (params: { isProduction: boolean }) =>
  params.isProduction
    ? FIAT.retirementApi.production
    : FIAT.retirementApi.staging;
