import { fetchGSProject } from "./fetchGSProject";
import { fetchVCSProject } from "./fetchVCSProject";

export const fetchProjectDetails = async ({ key }) => {
  try {
    const [registry, registryProjectId] = key.split("-");
    if (!registry || !registryProjectId) return null;

    const registryUpper = registry.toUpperCase();
    if (registryUpper === "VCS") {
      return await fetchVCSProject({ registryProjectId });
    } else if (registryUpper === "GS") {
      return await fetchGSProject({ registryProjectId });
    } else {
      return null;
    }
  } catch (err) {
    console.error("fetchProjectDetails failed: ", err.message);
    throw new Error(err.message);
  }
};
