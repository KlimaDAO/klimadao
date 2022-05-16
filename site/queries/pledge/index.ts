import { API_BASE_URL } from "lib/constants";
import { PledgeFormValues } from "lib/moralis";

export type putPledgeParams = {
  pageAddress: string
  pledge: PledgeFormValues;
  signature: string | undefined;
};

export const putPledge = (params: putPledgeParams) => {
  return fetch(`${API_BASE_URL}/api/pledge`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.signature}`,
    },
    body: JSON.stringify({
      pageAddress: params.pageAddress,
      pledge: params.pledge
    }),
  })};
