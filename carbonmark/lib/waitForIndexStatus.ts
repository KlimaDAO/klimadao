import { queryKlimaBlockNumber } from "./retirementDataQueries/retirementDataViaPolygonDigitalCarbon";

export const waitForIndexStatus = async (
  retirementBlockNumber: number
): Promise<"indexed" | "timeout"> => {
  let currentBlock = await queryKlimaBlockNumber();
  let counter = 0;

  while (currentBlock < retirementBlockNumber && counter < 20) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    currentBlock = await queryKlimaBlockNumber();
    counter++;
  }

  if (currentBlock >= retirementBlockNumber) {
    return "indexed";
  }

  return "timeout";
};
