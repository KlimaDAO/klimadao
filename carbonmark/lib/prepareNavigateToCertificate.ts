import { queryKlimaBlockNumber } from "@klimadao/lib/utils";
import { NextRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

export const prepareNavigateToCertificate = async (
  router: NextRouter,
  beneficiaryAddress: string,
  retirementIndex: number,
  blockNumber: number,
  setSubgraphIndexed: Dispatch<SetStateAction<boolean | "timed out">>
): Promise<boolean | "timed out"> => {
  let currentBlock = await queryKlimaBlockNumber();
  let counter = 0;

  while (currentBlock < blockNumber && counter < 20) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    currentBlock = await queryKlimaBlockNumber();
    counter++;
  }

  if (currentBlock >= blockNumber) {
    router.prefetch(`/retirements/${beneficiaryAddress}/${retirementIndex}`);
    setSubgraphIndexed(true);
    return true;
  }

  return "timed out";
};
