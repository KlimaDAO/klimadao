import { API_BASE_URL } from "lib/constants";
import { PledgeFormValues } from "../types";

export interface putPledgeParams {
  pledge: PledgeFormValues;
  pageAddress: string;
  signature: string;
}

export const putPledge = (params: putPledgeParams): Promise<Response> =>
  fetch(`${API_BASE_URL}/api/pledge`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.signature}`,
    },
    body: JSON.stringify({
      pageAddress: params.pageAddress,
      pledge: params.pledge,
    }),
  });
