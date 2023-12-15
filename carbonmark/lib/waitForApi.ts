import { getVintages } from ".generated/carbonmark-api-sdk/clients";

export const waitForApi = async (
): Promise<void> => {
  let apiReady = false;

  while (!apiReady) {
    const vintages = getVintages()
    if ((await vintages).length) apiReady = true;
  }
};
