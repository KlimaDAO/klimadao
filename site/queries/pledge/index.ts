import { API_BASE_URL } from "lib/constants";
import { PledgeFormValues } from "lib/moralis";

export type putPledgeParams = {
  pledge: PledgeFormValues;
  sessionToken: string | undefined;
};

export const putPledge = (params: putPledgeParams) =>
  fetch(`${API_BASE_URL}/api/pledge`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.sessionToken}`,
    },
    body: JSON.stringify(params.pledge),
  });
