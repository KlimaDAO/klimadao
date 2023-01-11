import { urls } from "../../constants";

/**
 * In some cases, like for stable backend APIs or for client-side ENS requests, we need an infura URL
 * This util takes generates the correct eth or polygon url for the given id */
export const getInfuraUrl = (params: {
  chain?: "polygon" | "eth";
  infuraId: string;
}): string => {
  const { chain = "polygon" } = params; // fallback to polygon as default
  const baseUrl = chain === "eth" ? urls.infuraEthRpc : urls.infuraPolygonRpc;
  return `${baseUrl}/${params.infuraId}`;
};
