import { fetchGSProject } from "./fetchGSProject";
import { fetchVCSProject } from "./fetchVCSProject";

/**
 * @typedef {Object} Params
 * @property {string} registryProjectId - Project id number `"981"`
 * @property {string} registry - Registry identifier "VCS" | "GS"
 * @param Params
 */
export const fetchProjectDetails = async ({ registry, registryProjectId }) => {
  try {
    if (registry === "VCS") {
      return await fetchVCSProject({ registryProjectId });
    } else if (registry === "GS") {
      return await fetchGSProject({ registryProjectId });
    } else {
      return null;
    }
  } catch (err) {
    console.error("fetchProjectDetails failed: ", err.message);
    throw new Error(err.message);
  }
};
