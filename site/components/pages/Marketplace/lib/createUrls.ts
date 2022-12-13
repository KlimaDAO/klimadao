import { Project } from "@klimadao/lib/types/marketplace";

export const createProjectLink = (project: Project) =>
  `/marketplace/projects/${project.key}-${project.vintage}`;

