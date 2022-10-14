import isEqual from "lodash/isEqual";
import sortBy from "lodash/sortBy";
import {
  Footprint,
  Pledge,
  Category,
  PledgeFormValues,
  Wallet,
} from "../types";
import { generateNonce } from ".";

const buildFootprint = (
  currentFootprint: Footprint[],
  categories: Category[],
  total: number
): Footprint[] => {
  const current = currentFootprint[currentFootprint.length - 1];

  // ensure category objects in the array are in order before comparing for equality
  const currentCategories = sortBy(
    current.categories,
    (category) => category.name
  );
  const newCategories = sortBy(categories, (category) => category.name);

  if (isEqual(currentCategories, newCategories) && current.total === total) {
    return currentFootprint;
  }

  return [
    ...currentFootprint,
    { timestamp: Date.now(), total: total, categories },
  ];
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
    footprint: [
      {
        timestamp: Date.now(),
        total: params.pledge.footprint,
        categories,
      },
    ],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    wallets: {},
  };
};

interface putPledgeParams {
  newPledgeValues: PledgeFormValues;
  currentPledgeValues: Pledge;
}

export const putPledgeAttributes = (params: putPledgeParams): Pledge => {
  const { categories, ...rest } = params.newPledgeValues;
  // format wallets in here instead of form
  const formatWalletsForApi = (wallets: Wallet[] | undefined) => {
    if (!wallets) return undefined;
    const formattedWallets: {
      [address: string]: { address: string; saved: boolean; status: string };
    } = {};
    wallets.map(
      (wallet: { address: string; status: string; saved: boolean }) =>
        (formattedWallets[wallet.address] = wallet)
    );
    return formattedWallets;
  };
  return {
    ...params.currentPledgeValues,
    ...rest,
    id: params.currentPledgeValues.id,
    updatedAt: Date.now(),
    nonce: generateNonce(),
    footprint: buildFootprint(
      params.currentPledgeValues.footprint,
      categories,
      params.newPledgeValues.footprint
    ),
    wallets: formatWalletsForApi(params.newPledgeValues.wallets),
  };
};
