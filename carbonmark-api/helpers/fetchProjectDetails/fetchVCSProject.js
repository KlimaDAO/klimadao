// @ts-check
import { getSanityClient } from "../../sanity";
import { fetchProjects } from "../../sanity/queries";

const sanity = getSanityClient();

/**
 * @typedef {Object} Params
 * @property {string} registryProjectId - Project id number `"981"`
 */
export const fetchVCSProject = async ({ registryProjectId }) => {
  try {
    const registry = "VCS";
    const project = await sanity.fetch(fetchProjects, {
      registry,
      registryProjectId,
    });

    if (!project) return null;

    return {
      key: `${registry}-${registryProjectId}`,
      projectID: registryProjectId,
      name: project.name,
      registry,
      country: project.country,
      description: project.description ?? undefined,
      location: project.geolocation ?? undefined,
      methodologies: project.methodologies,
      images: project.projectContent?.images,
      long_description: project.projectContent?.longDescription,
      url: project.url,
    };
  } catch (err) {
    console.error("fetchVCSProject failed: ", err.message);
    throw new Error(err.message);
  }
};
