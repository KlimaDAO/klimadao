import { ICR_CONFIG } from "../../app.constants";
import { NetworkParam } from "../../models/NetworkParam.model";

export const ICR_API = (
  network?: "polygon" | "mumbai"
): { ICR_API_URL: string; ICR_API_KEY: string } => {
  const validatedNetwork: NetworkParam =
    network === "polygon" || network === "mumbai" ? network : "polygon";

  const apiConfig = ICR_CONFIG[validatedNetwork];

  if (!apiConfig.apiKey || !apiConfig.url) {
    throw new Error(
      `API URL or key is undefined for network: ${validatedNetwork}`
    );
  }

  return { ICR_API_URL: apiConfig.url, ICR_API_KEY: apiConfig.apiKey };
};
