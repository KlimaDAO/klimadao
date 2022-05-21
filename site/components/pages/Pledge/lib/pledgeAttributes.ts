import { Footprint, Pledge, Category, PledgeFormValues } from "../types";
import { generateNonce } from ".";

const buildFootprint = (
  currentFootprint: Footprint[],
  newFootprint: number,
  categories: Category[],
): Footprint[] => {
  if (currentFootprint.at(-1)?.total === newFootprint) return currentFootprint;
  // compare categories

  return [...currentFootprint, { timestamp: Date.now(), total: newFootprint, categories }];
};

interface createPledgeParams {
  id: string;
  pledge: PledgeFormValues;
}

export const createPledgeAttributes = (params: createPledgeParams): Pledge => {
  const { categories, ...rest } = params.pledge;

  return {
    ...rest,
    id: params.id,
    nonce: generateNonce(),
    footprint: [{ 
      timestamp: Date.now(),
      total: params.pledge.footprint,
      categories,
    }],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
};

interface putPledgeParams {
  newPledgeValues: PledgeFormValues;
  currentPledgeValues: Pledge;
}

export const putPledgeAttributes = (params: putPledgeParams): Pledge => {
  const { categories, ...rest } = params.newPledgeValues;

  return {
    ...params.currentPledgeValues,
    ...rest,
    id: params.currentPledgeValues.id,
    updatedAt: Date.now(),
    nonce: generateNonce(),
    footprint: buildFootprint(
      params.currentPledgeValues.footprint,
      params.newPledgeValues.footprint,
      categories
    ),
  };
};
