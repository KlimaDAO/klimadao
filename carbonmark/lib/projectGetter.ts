import { CarbonToken } from "@klimadao/lib/constants";
import {
  CategoryName,
  DetailedProject,
  Project,
} from "lib/types/carbonmark.types";
import { isCategoryName } from "./types/carbonmark.guard";

export const getCategoryFromProject = (
  project: Project | DetailedProject
): CategoryName => {
  const name = project.methodologies?.[0]?.category;
  return asCategoryName(name); // fallback for Staging Testnet Data
};

export const asCategoryName = (name?: string | null): CategoryName =>
  isCategoryName(name) ? name : "Other"; // fallback for Staging Testnet Data

export const getMethodologyFromProject = (project: Project) =>
  project.methodologies?.[0]?.id ?? "Unknown";

export const getFullProjectId = (project: DetailedProject | Project) =>
  `${project.key}-${project.vintage}`;

export const createProjectTokenName = (
  project: DetailedProject,
  tokenType: CarbonToken
) => {
  const projectID = getFullProjectId(project);
  return `${tokenType.toUpperCase()}-${projectID}`;
};
