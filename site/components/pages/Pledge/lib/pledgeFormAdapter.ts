import { DEFAULT_NONCE } from ".";
import { Pledge, PledgeFormValues } from "../types";

export const DEFAULT_PLEDGE_VALUES: Pledge = {
  id: "",
  ownerAddress: "",
  name: "",
  nonce: DEFAULT_NONCE,
  profileImageUrl: "",
  profileWebsiteUrl: "",
  description: "",
  methodology: "",
  footprint: [
    {
      timestamp: 0,
      total: 0,
      categories: [{ name: "", quantity: 0 }],
    },
  ],
  wallets: {},
};

export const pledgeFormAdapter = (pledge: Pledge): PledgeFormValues => {
  const currentFootprint = pledge.footprint[pledge.footprint.length - 1];

  return {
    id: pledge.id,
    ownerAddress: pledge.ownerAddress,
    name: pledge.name,
    profileImageUrl: pledge.profileImageUrl,
    profileWebsiteUrl: pledge.profileWebsiteUrl,
    nonce: pledge.nonce,
    description: pledge.description,
    methodology: pledge.methodology,
    footprint: currentFootprint.total,
    categories: currentFootprint.categories,
    wallets: pledge.wallets ? Object.values(pledge.wallets) : undefined,
  };
};
