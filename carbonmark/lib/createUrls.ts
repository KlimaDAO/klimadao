import { urls } from "@klimadao/lib/constants";
import { Price, Project } from "lib/types/carbonmark";

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

export const createProjectPoolRetireLink = (
  project: ProjectData,
  pool: Price["poolName"]
) => `${createProjectLink(project)}/retire/pools/${pool.toLowerCase()}`;

export const createSellerLink = (handle: string) => `/users/${handle}`;

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
