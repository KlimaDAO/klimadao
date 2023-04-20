import { Project } from "lib/types/carbonmark";

export const getCategoryFromProject = (project: Project) =>
  project.methodologies?.[0]?.category || "Other"; // fallback for Staging Testnet Data

export const getMethodologyFromProject = (project: Project) =>
  project.methodologies?.[0]?.id || "Unknown";
