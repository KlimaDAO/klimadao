import { getVintages } from ".generated/carbonmark-api-sdk/clients";
import { urls } from "./constants";

export const waitForApi = async (): Promise<boolean> => {
  let counter = 0;

  while (counter < 24) {
    try {
      await getVintages();
      return true;
    } catch (e) {
      console.debug(
        `Waiting for API to come online at $${urls.api.base} (${counter})`
      );
    }
    await new Promise((resolve) => setTimeout(resolve, 5000));
    counter++;
  }
  console.debug(`Failed to contact API`);
  return false;
};
