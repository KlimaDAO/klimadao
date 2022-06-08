import { urls } from "@klimadao/lib/constants";

// For stable builds on the server we pass the Infura URL endpoint to the providers
// This provider URL is only needed on the server side, not on the client

export const getInfuraUrlPolygon = () => {
  const infuraID = process.env.INFURA_ID;
  if (!infuraID) return;
  return `${urls.infuraRpc}/${infuraID}`;
};

export const getInfuraUrlEther = () => {
  const infuraID = process.env.INFURA_ID;
  if (!infuraID) return;
  return `${urls.infuraEth}/${infuraID}`;
};
