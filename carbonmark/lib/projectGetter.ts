import { Project } from "lib/types/carbonmark";

export const getCategoryFromProject = (project: Project) =>
  (project?.methodologies?.length && project.methodologies[0].category) ||
  "Other"; // fallback for Staging Testnet Data
