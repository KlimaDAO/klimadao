import { Pledge, PledgeFormValues } from "../types";
import { DEFAULT_NONCE } from ".";

const DEFAULT_VALUES = {
  id: "",
  ownerAddress: "",
  name: "",
  nonce: DEFAULT_NONCE,
  description: "",
  methodology: "",
  footprint: 0,
};

export const pledgeResolver = (pledge: Pledge | null): PledgeFormValues => {
  if (!pledge) return DEFAULT_VALUES;

  const footprint = pledge.footprint.at(-1)?.total as number;

  return {
    id: pledge.id,
    ownerAddress: pledge.ownerAddress,
    name: pledge.name,
    nonce: pledge.nonce,
    description: pledge.description,
    methodology: pledge.methodology,
    footprint,
  };
};
