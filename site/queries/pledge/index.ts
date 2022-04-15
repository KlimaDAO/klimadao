import { urls } from "@klimadao/lib/constants";
import { API_BASE_URL } from "lib/constants";

type getPledgeParams = { address: string };

export const getPledge = (params: getPledgeParams) =>
  fetch(`${API_BASE_URL}/api/pledge?address=${params.address}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
