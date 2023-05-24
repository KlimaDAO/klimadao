import { CarbonToken } from "@klimadao/lib/constants";
import { Project } from "lib/types/carbonmark";

export const getCategoryFromProject = (project: Project) =>
  project.methodologies?.[0]?.category ?? "Other"; // fallback for Staging Testnet Data

export const getMethodologyFromProject = (project: Project) =>
  project.methodologies?.[0]?.id ?? "Unknown";

export const getProjectName = (project: Project) =>
  `${project.key}-${project.vintage}`;

export const createProjectTokenName = (
  project: Project,
  tokenType: CarbonToken
) => {
  const projectName = getProjectName(project);
  return `${tokenType.toUpperCase()}-${projectName}`;
};
