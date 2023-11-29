import { ICR_API_URLS } from "../../../../lib/constants";
import { NetworkParam } from "../../models/NetworkParam.model";

export const ICR_API = (
  network?: string
): { ICR_API_URL: string; ICR_API_KEY: string } => {
  const validatedNetwork: NetworkParam =
    network === "polygon" || network === "mumbai" ? network : "polygon";

  const api_key =
    validatedNetwork === "polygon"
      ? process.env.ICR_MUMBAI_API_KEY
      : process.env.ICR_MUMBAI_API_KEY;

  if (!api_key || !ICR_API_URLS[validatedNetwork]) {
    throw new Error(
      `API URL or key is undefined for network: ${validatedNetwork}`
    );
  }

  return { ICR_API_URL: ICR_API_URLS[validatedNetwork], ICR_API_KEY: api_key };
};
