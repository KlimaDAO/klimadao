import { FIAT_RETIREMENT_API_URL } from "lib/constants";

interface Params {
  beneficiary_address: string | null;
  beneficiary_name: string;
  retirement_message: string;
  quantity: string;
  retirement_token: string;
  project_address: string | null;
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
    const res = await fetch(FIAT_RETIREMENT_API_URL, {
      body: JSON.stringify({
        ...params,
        cancel_url: "https://app.klimadao.finance/#/offset",
        referrer: "klimadao",
        mode: "quote",
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
    const quote: QuoteResponse = await res.json();
    return (Number(quote.totalPriceCents) / 100).toString();
  } catch (e) {
    console.error(e);
    throw e;
  }
};
