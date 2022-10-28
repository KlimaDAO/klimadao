import { BASE_URL, FIAT_RETIREMENT_API_URL } from "lib/constants";

interface Params {
  beneficiary_address: string;
  beneficiary_name: string;
  retirement_message: string;
  quantity: string;
  retirement_token: string;
  project_address: string | null;
}

interface CheckoutResponse {
  url: string;
}

export const redirectFiatCheckout = async (params: Params): Promise<void> => {
  try {
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
    const res = await fetch(FIAT_RETIREMENT_API_URL, {
      body: JSON.stringify({
        ...params,
        cancel_url: `${BASE_URL}/#/offset?${searchParams.toString()}`,
        referrer: "klimadao",
        mode: "checkout",
      }),
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    });
    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message);
    }
    const { url }: CheckoutResponse = await res.json();
    if (url) {
      window.location.href = url;
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};
