import { NetworkParam } from "../../../.generated/carbonmark-api-sdk/types";

export const ICR_CONFIG = {
  polygon: {
    url: "https://api.carbonregistry.com/v0",
    apiKey: process.env.ICR_MAINNET_API_KEY,
  },
  mumbai: {
    url: "https://gaia-api-dev.mojoflower.io/v0",
    apiKey: process.env.ICR_MUMBAI_API_KEY,
  },
};
export const ICR_API = (network: NetworkParam) => {
  const validatedNetwork =
    network === "polygon" || network === "mumbai" ? network : "polygon";
  const apiConfig = ICR_CONFIG[validatedNetwork];
  if (!apiConfig.apiKey) {
    throw new Error(
      `ICR api key is undefined for network: ${validatedNetwork}`
    );
  }
  if (!apiConfig.url) {
    throw new Error(
      `ICR api url is undefined for network: ${validatedNetwork}`
    );
  }
  return { ICR_API_URL: apiConfig.url, ICR_API_KEY: apiConfig.apiKey };
};
