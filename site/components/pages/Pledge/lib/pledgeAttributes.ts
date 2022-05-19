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
    id: params.id,
    nonce: generateNonce(),
    footprint: [{ total: params.pledge.footprint, timestamp: Date.now() }],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
};

interface putPledgeParams {
  pledge: PledgeFormValues;
  currentPledge: Pledge;
}

export const putPledgeAttributes = (params: putPledgeParams): Pledge => {
  return {
    ...params.currentPledge,
    ...params.pledge,
    id: params.currentPledge.id,
    updatedAt: Date.now(),
    nonce: generateNonce(),
    footprint: buildFootprint(
      params.currentPledge.footprint,
      params.pledge.footprint
    ),
  };
};
