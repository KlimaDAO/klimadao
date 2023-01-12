import { urls } from "../../constants";

/**
 * In some cases, like for stable backend APIs or for client-side ENS requests, we need an infura URL
 * This util takes generates the correct eth or polygon url for the given id */
export const getInfuraUrl = (params: {
  chain?: "polygon" | "eth" | "mumbai";
  infuraId: string;
}): string => {
  const { chain = "polygon" } = params; // fallback to polygon as default
  const baseUrl = {
    eth: urls.infuraEthRpc,
    polygon: urls.infuraPolygonRpc,
    mumbai: urls.infuraMumbaiRpc,
  }[chain];
  return `${baseUrl}/${params.infuraId}`;
};
