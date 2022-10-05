import { Pledge, PledgeFormValues } from "../types";
import { DEFAULT_NONCE } from ".";

export const DEFAULT_VALUES: Pledge = {
  id: "",
  ownerAddress: "",
  name: "",
  nonce: DEFAULT_NONCE,
  profileImageUrl: "",
  description: "",
  methodology: "",
  footprint: [
    {
      timestamp: 0,
      total: 0,
      categories: [{ name: "", quantity: 0 }],
    },
  ],
  wallets: [{ address: "", verified: false, saved: false }],
};

export const pledgeFormAdapter = (pledge: Pledge): PledgeFormValues => {
  const currentFootprint = pledge.footprint[pledge.footprint.length - 1];

  return {
    id: pledge.id,
    ownerAddress: pledge.ownerAddress,
    name: pledge.name,
    profileImageUrl: pledge.profileImageUrl,
    nonce: pledge.nonce,
    description: pledge.description,
    methodology: pledge.methodology,
    footprint: currentFootprint.total,
    categories: currentFootprint.categories,
    wallets: pledge.wallets,
  };
};
