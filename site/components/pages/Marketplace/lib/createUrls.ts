import { Project } from "@klimadao/lib/types/marketplace";

export const createProjectLink = (project: Project) =>
  `/marketplace/projects/${project.key}-${project.vintage}`;

export const createProjectPurchaseLink = (
  project: Project,
  listingId: string
) => `${createProjectLink(project)}/purchase/${listingId}`;
