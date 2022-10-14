import { PledgeFormValues } from "../types";

export interface putPledgeParams {
  pledge: PledgeFormValues;
  pageAddress: string;
  signature: string;
<<<<<<< HEAD
  urlPath: string;
=======
  secondaryWalletAddress?: string;
>>>>>>> multi wallet pledge ready for final cleanup and code review
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
<<<<<<< HEAD
      urlPath: params.urlPath,
=======
      secondaryWalletAddress: params.secondaryWalletAddress,
>>>>>>> multi wallet pledge ready for final cleanup and code review
    }),
  });
