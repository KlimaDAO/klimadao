import { urls } from "@klimadao/lib/constants";
import { Project } from "@klimadao/lib/types/carbonmark";

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
  tokenAddress: string;
}) => `${urls.offset}
?quantity=${params.quantity}
&inputToken=${params.tokenAddress}`;
