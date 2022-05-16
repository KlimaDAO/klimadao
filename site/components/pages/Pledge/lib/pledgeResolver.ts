import { Pledge, PledgeFormValues } from "../types";

export const pledgeResolver = (pledge: Pledge): PledgeFormValues => {
  const currentFootprint = pledge.footprint
    ? pledge.footprint.at(-1)?.total
    : 0;

  return {
    id: pledge.id || "",
    ownerAddress: pledge.ownerAddress || "",
    name: pledge.name || "",
    nonce: pledge.nonce || 33,
    description: pledge.description || "",
    methodology: pledge.methodology || "",
    footprint: currentFootprint as number,
  };
};
