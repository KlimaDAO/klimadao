import { redirectFiatCheckout as redirectFiatCheckoutLib } from "@klimadao/lib/utils";
import { BASE_URL, IS_PRODUCTION } from "lib/constants";

interface Params {
  beneficiary_address: string;
  beneficiary_name: string;
  retirement_message: string;
  quantity: string;
  retirement_token: string;
  project_address: string | null;
}

export const redirectFiatCheckout = async (params: Params): Promise<void> => {
  const searchParams = new URLSearchParams({
    quantity: params.quantity,
    retirementToken: params.retirement_token,
    message: params.retirement_message,
    beneficiary: params.beneficiary_name,
    beneficiaryAddress: params.beneficiary_address,
  });
  if (params.project_address) {
    searchParams.append("projectTokens", params.project_address);
  }

  await redirectFiatCheckoutLib({
    isProduction: IS_PRODUCTION,
    referrer: "klimadao",
    cancelUrl: `${BASE_URL}/#/offset?${searchParams.toString()}`,
    retirement: params,
  });
};
