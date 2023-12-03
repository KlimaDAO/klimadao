// import { ICR_CONFIG } from "../../app.constants";
import { NetworkParam } from "../../models/NetworkParam.model";

const ICR_CONFIG = {
  polygon: {
    url: "https://api.carbonregistry.com/v0",
    apiKey: process.env.ICR_MAINNET_API_KEY,
  },
  mumbai: {
    url: "https://gaia-api-dev.mojoflower.io/v0",
    apiKey: process.env.ICR_MUMBAI_API_KEY,
  },
};

export const ICR_API = (
  network?: "polygon" | "mumbai"
): { ICR_API_URL: string; ICR_API_KEY: string } => {
  const validatedNetwork: NetworkParam =
    network === "polygon" || network === "mumbai" ? network : "polygon";

  const apiConfig = ICR_CONFIG[validatedNetwork];

  if (!apiConfig.apiKey || !apiConfig.url) {
    throw new Error(
      `ICR api url or key is undefined for network: ${validatedNetwork}`
    );
  }

  return { ICR_API_URL: apiConfig.url, ICR_API_KEY: apiConfig.apiKey };
};
