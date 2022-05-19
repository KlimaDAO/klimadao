import { v4 as uuidv4 } from "uuid";

import { Footprint, Pledge, PledgeFormValues } from "../types";
import { generateNonce } from ".";

const buildFootprint = (
  currentFootprint: Footprint[],
  newFootprint: number
): Footprint[] => {
  if (currentFootprint.at(-1)?.total === newFootprint) return currentFootprint;

  return [...currentFootprint, { timestamp: Date.now(), total: newFootprint }];
};

interface createPledgeParams {
  id: string;
  pledge: PledgeFormValues;
}

export const createPledgeAttributes = (params: createPledgeParams): Pledge => {
  return {
    ...params.pledge,
    id: uuidv4(),
    nonce: generateNonce(),
    footprint: [{ total: params.pledge.footprint, timestamp: Date.now() }],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
};

interface putPledgeParams {
  pledge: PledgeFormValues;
  currentFootprint: Footprint[];
}

export const putPledgeAttributes = (params: putPledgeParams): Pledge => {
  return {
    ...params.pledge,
    updatedAt: Date.now(),
    nonce: generateNonce(),
    footprint: buildFootprint(params.currentFootprint, params.pledge.footprint),
  };
};
