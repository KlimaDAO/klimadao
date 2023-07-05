import fetchGSProject from "./fetchGSProject";
import fetchVCSProject from "./fetchVCSProject";

/**
 * Params type
 * @property {string} registryProjectId - Project id number `"981"`
 * @property {string} registry - Registry identifier "VCS" | "GS"
 */
type Params = {
  registryProjectId: string;
  registry: string;
};

const fetchProjectDetails = async ({ registry, registryProjectId }: Params) => {
  if (registry === "VCS") {
    return await fetchVCSProject({ registryProjectId });
  } else if (registry === "GS") {
    return await fetchGSProject();
  } else {
    return null;
  }
};

module.exports = { fetchProjectDetails };
