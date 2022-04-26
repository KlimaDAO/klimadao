import { API_BASE_URL } from "lib/constants";

type getPledgeParams = { address: string };

export const getPledge = (params: getPledgeParams) =>
  fetch(`${API_BASE_URL}/api/pledge?address=${params.address}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

type putPledgeParams = { sessionToken: string | undefined};

export const putPledge = (params: putPledgeParams) =>
  fetch(`${API_BASE_URL}/api/pledge`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.sessionToken}`,
    },
    body: JSON.stringify(params.pledge),
  });
