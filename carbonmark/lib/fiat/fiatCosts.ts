import { urls } from "lib/constants";

interface Retirement {
  beneficiary_address: string | null;
  beneficiary_name: string;
  retirement_message: string;
  quantity: string;
  retirement_token: string | null;
  project_address: string | null;
  listing_id: string | null;
}

interface Params {
  cancelUrl: string;
  referrer: "klimadao" | "carbonmark";
  retirement: Retirement;
}

interface QuoteResponse {
  url: "";
  totalPriceCents: string;
  networkFeeCents: string;
}

export const getFiatRetirementCost = async (
  params: Params
): Promise<string> => {
  try {
    const res = await fetch(urls.fiat.checkout, {
      body: JSON.stringify({
        ...params.retirement,
        cancel_url: params.cancelUrl,
        referrer: params.referrer,
        mode: "quote",
      }),
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    });
    if (!res.ok) {
      const { message, name } = await res.json();
      const e = new Error(message);
      e.name = name;
      throw e;
    }
    const quote: QuoteResponse = await res.json();
    return (Number(quote.totalPriceCents) / 100).toString();
  } catch (e) {
    console.error("getFiatRetirementCost Error", e);
    throw e;
  }
};
