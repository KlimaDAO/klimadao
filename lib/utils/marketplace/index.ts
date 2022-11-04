import { Project, User } from "../../types/marketplace";

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

export const loginMarketplaceUser = async (params: {
  wallet: string;
}): Promise<{ nonce: string }> => {
  try {
    const result = await fetch(`${marketplace.users}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    const json = await result.json();
    return json;
  } catch (e) {
    console.error("Failed to login MarketplaceUser", e);
    return Promise.reject(e);
  }
};

export const verifyMarketplaceUser = async (params: {
  wallet: string;
  signature: string;
}): Promise<{ nonce: string }> => {
  try {
    const result = await fetch(`${marketplace.users}/login/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    const json = await result.json();
    return json;
  } catch (e) {
    console.error("Failed to verify MarketplaceUser", e);
    return Promise.reject(e);
  }
};

export const createMarketplaceUser = async (params: {
  handle: string;
  username: string;
  description?: string;
  wallet: string;
}): Promise<User> => {
  try {
    const result = await fetch(`${marketplace.users}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    const json = await result.json();
    return json;
  } catch (e) {
    console.error("Failed to create MarketplaceUser", e);
    return Promise.reject(e);
  }
};

export const updateMarketplaceUser = async (params: {
  handle: string;
  username: string;
  description?: string;
  wallet: string;
}): Promise<User> => {
  try {
    const result = await fetch(`${marketplace.users}/${params.wallet}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    const json = await result.json();
    return json;
  } catch (e) {
    console.error("Failed to update MarketplaceUser", e);
    return Promise.reject(e);
  }
};
