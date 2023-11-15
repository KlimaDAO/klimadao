import { Project, TokenPrice } from "lib/types/carbonmark.types";

type ProjectData = {
  key: Project["key"];
  vintage: Project["vintage"];
};
export const createProjectLink = (project: ProjectData) => {
  if (project.key.startsWith("ICR")) {
    return `/projects/${project.key}`;
  } else {
    return `/projects/${project.key}-${project.vintage}`;
  }
};

export const createProjectPurchaseLink = (
  project: ProjectData,
  listingId: string
) => `${createProjectLink(project)}/purchase/${listingId}`;

export const createProjectPoolRetireLink = (
  project: ProjectData,
  pool: TokenPrice["poolName"]
) => `${createProjectLink(project)}/retire/pools/${pool.toLowerCase()}`;

export const createSellerLink = (handle: string) => `/users/${handle}`;

export const createProjectPoolPurchaseLink = (
  project: ProjectData,
  pool: TokenPrice["poolName"]
) => `${createProjectLink(project)}/purchase/pools/${pool}`;
