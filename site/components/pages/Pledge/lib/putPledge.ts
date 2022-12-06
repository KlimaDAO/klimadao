import { Pledge, PledgeFormValues } from "../types";

export interface putPledgeParams {
  pledge: PledgeFormValues;
  pageAddress: string;
  signature: string;
  secondaryWalletAddress?: string;
  urlPath: string;
  action?: "accepting" | "rejecting";
}

export type PutPledgeResponse = {
  pledge: Pledge;
};

export const putPledge = async (
  params: putPledgeParams
): Promise<PutPledgeResponse> => {
  const res = await fetch("/api/pledge", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.signature}`,
    },
    body: JSON.stringify({
      pageAddress: params.pageAddress,
      pledge: params.pledge,
      secondaryWalletAddress: params.secondaryWalletAddress,
      urlPath: params.urlPath,
      action: params.action,
    }),
  });
  if (!res.ok) {
    const error = await res.json();
    console.error("putPledge failed: ", error);
    throw new Error(error.message);
  } else {
    const data = await res.json();
    return data;
  }
};
