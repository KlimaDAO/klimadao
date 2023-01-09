import { Project, Purchase, User } from "../../types/marketplace";

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

export const getMarketplaceUser = async (params: {
  user: string;
  type: "wallet" | "handle";
}): Promise<User> => {
  try {
    const result = await fetch(
      `${marketplace.users}/${params.user}?type=${params.type}`
    );
    const json = await result.json();
    return json;
  } catch (e) {
    console.error("Failed to getMarketplaceUser", e);
    return Promise.reject(e);
  }
};

export const getPurchase = async (params: {
  id: string;
}): Promise<Purchase | null> => {
  try {
    const result = await fetch(`${marketplace.purchases}/${params.id}`);

    const json = await result.json();
    return json;
  } catch (e) {
    console.error("Failed to getPurchase", e);
    return Promise.reject(e);
  }
};
