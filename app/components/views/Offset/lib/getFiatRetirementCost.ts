import { getFiatRetirementCost as getFiatRetirementCostLib } from "@klimadao/lib/utils";
import { BASE_URL, IS_PRODUCTION } from "lib/constants";

interface Params {
  beneficiary_address: string | null;
  beneficiary_name: string;
  retirement_message: string;
  quantity: string;
  retirement_token: string;
  project_address: string | null;
}

export const getFiatRetirementCost = async (params: Params): Promise<string> =>
  await getFiatRetirementCostLib({
    isProduction: IS_PRODUCTION,
    cancelUrl: `${BASE_URL}/#/offset`,
    referrer: "klimadao",
    retirement: params,
  });
