import { NetworkParam } from ".generated/carbonmark-api-sdk/types";
import { urls } from "@klimadao/lib/constants";
import { Project, TokenPrice } from "lib/types/carbonmark.types";

type ProjectData = {
  key: Project["key"];
  vintage: Project["vintage"];
  serialization?: Project["serialization"] | null;
};

export const createProjectLink = (projectData: ProjectData) => {
  return `/projects/${projectData.key}-${projectData.vintage}`;
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

export const getPolygonScanBaseUrl = (networkLabel: NetworkParam): string => {
  return networkLabel === "polygon" ? urls.polygonscan : urls.mumbaiPolygonscan;
};
