import { CarbonToken } from "@klimadao/lib/constants";
import {
  CategoryName,
  DetailedProject,
  Project,
} from "lib/types/carbonmark.types";
import { compact, isEmpty } from "lodash";
import { isCategoryName } from "./types/carbonmark.guard";

export const getCategoryFromProject = (
  project: Project | DetailedProject
): CategoryName => {
  const name = project.methodologies?.[0]?.category;
  return asCategoryName(name); // fallback for Staging Testnet Data
};

export const getCategoriesFromProject = (
  project: DetailedProject
): CategoryName[] => {
  const methodologies = compact(project.methodologies);
  return !isEmpty(methodologies)
    ? Array.from(
        new Set(
          methodologies.map(
            (methodology) => methodology.category as CategoryName
          )
        )
      )
    : ["Other"];
};

export const asCategoryName = (name?: string | null): CategoryName =>
  isCategoryName(name) ? name : "Other"; // fallback for Staging Testnet Data

export const getMethodologyFromProject = (project: DetailedProject) =>
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
