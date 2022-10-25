import { Project } from "../../types/marketplace";

import { marketplace } from "../../constants";

export const getMarketplaceProjects = async (): Promise<Project[]> => {
  try {
    const result = await fetch(marketplace.projects);
    const json = await result.json();
    return json;
  } catch (e) {
    console.error("Failed to getMarketplaceProjects", e);
    return Promise.reject(e);
  }
};

export const getMarketplaceProject = async (
  projectId: string
): Promise<Project> => {
  try {
    const result = await fetch(`${marketplace.projects}/${projectId}`);
    const json = await result.json();
    return json;
  } catch (e) {
    console.error("Failed to getMarketplaceProject", e);
    return Promise.reject(e);
  }
};
