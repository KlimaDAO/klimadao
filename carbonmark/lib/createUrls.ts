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

export const createRetireLink = (params: {
  quantity: string;
  retirementToken: string;
}) => {
  const searchParams = new URLSearchParams();

  if (params.retirementToken) {
    searchParams.append("retirementToken", params.retirementToken);
  }
  if (params.quantity) {
    searchParams.append("quantity", params.quantity);
  }

  return `${urls.offset}?${searchParams}`;
};

export const createRedeemLink = (params: {
  poolName: string;
  projectTokenAddress: string;
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
