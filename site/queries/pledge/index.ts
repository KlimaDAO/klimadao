import { API_BASE_URL } from "lib/constants";

type getPledgeParams = { address: string };

export const getPledge = (params: getPledgeParams) =>
  fetch(`${API_BASE_URL}/api/pledge?address=${params.address}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

export const putPledge = (params) => {
  return fetch(
    `${API_BASE_URL}/api/pledge?sessionToken=${params.sessionToken}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params.pledge),
    }
  );
};
