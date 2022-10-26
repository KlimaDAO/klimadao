import { PledgeFormValues } from "../types";

export interface putPledgeParams {
  pledge: PledgeFormValues;
  pageAddress: string;
  signature: string;
  secondaryWalletAddress?: string;
  urlPath: string;
}

export const putPledge = (params: putPledgeParams): Promise<Response> =>
  fetch("/api/pledge", {
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
    }),
  });
