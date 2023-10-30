import { ICR_API_URLS } from "../../app.constants";
import { NetworkParam } from "../../models/NetworkParam.model";

export const ICR_API = (
  network: NetworkParam | undefined = "polygon"
): string => {
  return ICR_API_URLS[network];
};
