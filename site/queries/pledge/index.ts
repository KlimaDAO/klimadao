
import { urls } from "@klimadao/lib/constants";
import { IS_LOCAL_DEVELOPMENT } from "lib/constants";

const API_BASE_URL = IS_LOCAL_DEVELOPMENT ? "http://localhost:3000" : urls.home;

type getPledgeParams = { address: string };

export const getPledge = (params: getPledgeParams) =>
  fetch(`http://localhost:3000/api/pledge?address=${params.address}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
