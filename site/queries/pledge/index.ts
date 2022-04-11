import { urls } from "@klimadao/lib/constants";
import { IS_LOCAL_DEVELOPMENT } from "lib/constants";

const API_BASE_URL = IS_LOCAL_DEVELOPMENT ? "http://localhost:3000" : urls.home;

export const getPledge = (address: string) =>
  fetch(`${API_BASE_URL}/api/pledge?address=${address}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
