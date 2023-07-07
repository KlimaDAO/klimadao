import { getFiatRetirementUrl } from "../getFiatUrls";

interface Retirement {
  beneficiary_address: string;
  beneficiary_name: string;
  retirement_message: string;
  quantity: string;
  retirement_token: string;
  project_address: string | null;
}

interface Params {
  isProduction: boolean;
  cancelUrl: string;
  referrer: "klimadao" | "carbonmark";
  retirement: Retirement;
}

interface CheckoutResponse {
  url: string;
}

export const redirectFiatCheckout = async (params: Params): Promise<void> => {
  try {
    const res = await fetch(
      getFiatRetirementUrl({ isProduction: params.isProduction }),
      {
        body: JSON.stringify({
          ...params.retirement,
          cancel_url: params.cancelUrl,
          referrer: params.referrer,
          mode: "checkout",
        }),
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
      }
    );

    if (!res.ok) {
      const { message, name } = await res.json();
      const e = new Error(message);
      e.name = name; // see checkout api documentation for list of named errors
      throw e;
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
