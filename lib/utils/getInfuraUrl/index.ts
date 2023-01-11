import { urls } from "../../constants";

// For stable builds on the server we pass the Infura URL endpoint to the providers
// This provider URL is only needed on the server side, not on the client

export const getInfuraUrl = (params: {
  chain?: "polygon" | "eth";
  infuraId: string;
}) => {
  const { chain = "polygon" } = params; // fallback to polygon as default
  const baseUrl = chain === "eth" ? urls.infuraEthRpc : urls.infuraPolygonRpc;
  return `${baseUrl}/${params.infuraId}`;
};
