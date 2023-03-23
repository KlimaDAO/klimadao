import { urls } from "@klimadao/lib/constants";
import { Project } from "lib/types/carbonmark";

type ProjectData = {
  key: Project["key"];
  vintage: Project["vintage"];
};
export const createProjectLink = (project: ProjectData) =>
  `/projects/${project.key}-${project.vintage}`;

export const createProjectPurchaseLink = (
  project: ProjectData,
  listingId: string
) => `${createProjectLink(project)}/purchase/${listingId}`;

export const createSellerLink = (handle: string) => `/users/${handle}`;

/**
 * @example
 * https://app.klimadao.finance/#/offset?
 *   retirementToken=nct
 *   &projectTokens=0x261bef4b19ace1398c6603ed7299296d0e32cc00
 *   &quantity=123
 */
export const createRetireLink = (params: {
  /** Carbon pool like "nct" or address of an owned token */
  retirementToken?: string;
  /** Project token address for selective retirement out of pool */
  projectTokens?: string;
  quantity?: string;
}) => {
  const searchParams = new URLSearchParams();

  if (params.retirementToken) {
    searchParams.append("retirementToken", params.retirementToken);
  }
  if (params.projectTokens) {
    searchParams.append("projectTokens", params.projectTokens);
  }
  if (params.quantity) {
    searchParams.append("quantity", params.quantity);
  }

  return `${urls.offset}?${searchParams}`;
};

/**
 * @example
 * https://app.klimadao.finance/#/redeem?
 *   pool=nct
 *   &projectTokenAddress=0x261bef4b19ace1398c6603ed7299296d0e32cc00
 */
export const createRedeemLink = (params: {
  poolName?: string;
  projectTokenAddress?: string;
}) => {
  const searchParams = new URLSearchParams();

  if (params.poolName) {
    searchParams.append("pool", params.poolName);
  }
  if (params.projectTokenAddress) {
    searchParams.append("projectTokenAddress", params.projectTokenAddress);
  }

  return `${urls.redeem}?${searchParams}`;
};
